const {baseurl, postfix} = require("./config"); 
var DataFrame = require('dataframe-js').DataFrame
const axios = require('axios');
const _corr = require("calculate-correlation");


let sub = function (a,b){
    return a.map((e,i) => e - b[i]);
}

let div = function (a,b){
    return a.map((e,i) => e / b[i]);
}

let mul = function (a,b){
    return a.map((e,i) => e * b[i]);
}

let dot = function(a,b){
    let x = mul(a,b);
    return x.reduce((s,x)=>s+x)
}



let shift = function (a){
    //padded with last val
    let r = a.slice(1);
    //console.log(r);
    r.push(a[a.length - 1]);
    return r;
};

exports.shift = shift;
exports.dot = dot;
exports.mul = mul;
exports.sub = sub;
exports.div = div;

let getReturns = function (prices){
    return div(sub(shift(prices),prices),prices);
}
exports.getReturns = getReturns;

const corr = function(a,b){
    return _corr(a,b);
}
exports.corr = corr;


let hello = function(name){
    return {"name":name};
}
exports.hello = hello;

let load = async function(ticker){
   let url = baseurl+ticker;
   //let r = await fetch(url);
   let r = await axios.get(url);
   //console.log(r);
   //r = r.json();
   return r.data;
}
exports.load = load;

let createPriceDataframe = async function(tickers){
    let t = [];
    let days=60;
        
    for(let i=0;i<days;i++){
        let d=new Date(); 
        d.setDate(d.getDate() - days + i);
        t.push(d.toISOString().substring(0,10));
    }
    let dataframe = new DataFrame({
        time: t // <------ Time column
    }, ['time']);
    for(var k=0;k<tickers.length;k++){
        let t = tickers[k];
        let data = await load(t);
        let df = new DataFrame({
        time: data.times, // <------ Time column
        ticker:(data.prices)
        }, ['time',t+'_'+k]);
        dataframe = dataframe.join(df,"time");
    }
    return dataframe;
}
exports.createPriceDataframe = createPriceDataframe;

let createReturnsDataframe = function(priceDataframe){
    let colNames = priceDataframe.listColumns();
    let returnsDataframe=new DataFrame(priceDataframe);
    returnsDataframe.show();
    colNames.forEach(
        colName=>{
            let col = priceDataframe.toDict()[colName];
            if(colName!=="time"){
                var newCol = getReturns(col);
                returnsDataframe = returnsDataframe.withColumn(colName, (row,index)=>newCol[index]);
            }
        }
    );

    return returnsDataframe;

}
exports.createReturnsDataframe = createReturnsDataframe;


let calculateGlobalReturns = function(dataframe,weights){
    let data=
    dataframe.map(row => row.set('return', dot(row.toArray().slice(1),weights)));
    return data;
}

exports.calculateGlobalReturns = calculateGlobalReturns;



let calculateAUM = function(dataframe, initialBalance){
    
    var column = function(df, colName){
        let a = df.select(colName).toArray();
        let b = [];
        a.forEach(x=>b.push(x[0]));
        return b;
    }
    var _calculateAUM = function(returns, initialBalance){
        let aum = Array();
    
        aum.push(initialBalance);
        for(var i=1;i<returns.length;i++){
            aum.push((1 + returns[i-1]) * aum[i-1]);
        }
        return aum;
    }

    let aum=_calculateAUM(column(dataframe, "return"),initialBalance);

    let k=0;
    dataframe=dataframe.withColumn('aum',()=>aum[k++]);
    dataframe.show();
    return dataframe;
}

exports.calculateAUM=calculateAUM;