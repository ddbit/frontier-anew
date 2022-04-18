const {baseurl, postfix} = require("./config"); 
var DataFrame = require('dataframe-js').DataFrame


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



let hello = function(name){
    return {"name":name};
}
exports.hello = hello;

let load = async function(ticker){
   let r = await fetch(baseurl+ticker+postfix);
   //console.log(r);
   r = r.json();
   return r;
}
exports.load = load;

let createDataframe = async function(tickers){
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
        ticker:getReturns(data.prices)
        }, ['time',t]);
        dataframe = dataframe.join(df,"time");
    }
    return dataframe;
}
exports.createDataframe = createDataframe;

let calculateReturns = function(dataframe,weights){
    let data = dataframe;
    data=
    data.map(row => row.set('return', dot(row.toArray().slice(1),weights)));
    return data;
}

exports.calculateReturns = calculateReturns;


let calculateAUM = function(dataframe, initialBalance){
    
    var column = function(df, colName){
        let a = df.select(colName).toArray();
        let b = [];
        a.forEach(x=>b.push(x[0]));
        return b;
    }
    var _calculateAUM = function(returns, initialBalance){
        let aum = Array();
    
        aum.push((1 + returns[0]) * initialBalance);
        for(var i=1;i<returns.length;i++){
            aum.push((1 + returns[i]) * aum[i-1]);
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