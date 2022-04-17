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
}



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
   console.log(r);
   r = r.json();
   return r;
}
exports.load = load;

let createDataframe = async function(tickers){
    let t = [];
    let days=30;
        
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

let calculateReturns = async function(tickers, weights){
    let data = await createDataframe(tickers,weights);
    data=
    data.map(row => row.set('return', dot(row.toArray().slice(1),weights)));
    return data;
}

exports.calculateReturns = calculateReturns;