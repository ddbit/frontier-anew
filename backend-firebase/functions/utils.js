const {restClient} = require("@polygon.io/client-js");
const { variance, mean } = require("simple-statistics");
const {polygonKey} = require("./credentials");
const fs = require('fs').promises;
const  {mkdir} = require( "fs" );
mkdir(".cache",e=>console.log(e));


sub = function (a,b){
    return a.map((e,i) => e - b[i]);
}

div = function (a,b){
    return a.map((e,i) => e / b[i]);
}

mul = function (a,b){
    return a.map((e,i) => e * b[i]);
}

dot = function(a,b){
    let x = mul(a,b);
    return x.reduce((s,x)=>s+x)
}



shift = function (a){
    //padded with last val
    let r = a.slice(1);
    //console.log(r);
    r.push(a[a.length - 1]);
    return r;
}

exports.sub=sub;
exports.div=div;
exports.shift=shift;


priceAtDate=async function(ticker, date){
    const api = restClient(polygonKey);
    let from = date;
    let to = date;
    var response = //await api.forex.previousClose("C:EURUSD");
    await api.crypto.aggregates(
        ticker,
        1,
        "day",
        from,
        to,
        true
    );
    if (response.resultsCount==1)
        return response;
    else{
        let d = new Date(date);
        d.setDate(d.getDate() - 1);
        return await priceAtDate(ticker,d.toISOString().substring(0,10));
    }
        
}
exports.priceAtDate=priceAtDate;

const fromCache = async function(ticker){
    let filename=".cache/"+ticker+".json";
    console.log("reading "+filename);
    try{
        let fileBuffer = await fs.readFile(filename);
        console.log(fileBuffer.toString());
        obj=JSON.parse(fileBuffer);
        return obj;
    }
    catch(e){
        return undefined;
    }
}
exports.fromCache=fromCache;

const toCache=async function(jsonObj){
    var jsonContent = JSON.stringify(jsonObj);
    try{
        return await fs.writeFile(".cache/"+jsonObj.ticker+".json", jsonContent, 'utf8');
    }catch(e){
        console.log("An error occured while writing to cache");
    }
}
exports.toCache=toCache;

priceHistory = async function (ticker){

    let result = await fromCache(ticker);
    
    if(result!==undefined) {
        console.log("cache fetch");
        return result;
    }
        
    
    console.log("cache miss");

    const api = restClient(polygonKey);
    let to = new Date();
    let from = ((date) => {
        date.setDate(to.getDate() - 30);
        return date;
       }
     )(new Date());

   
    var response = //await api.forex.previousClose("C:EURUSD");
    await api.crypto.aggregates(
       ticker,
       1,
       "day",
       from.toISOString().substring(0,10),
       to.toISOString().substring(0,10),
       true
   );
   
   let close = [];
   let times = [];
   response.results.forEach(r => {
       //console.log(r);
       close.push(r.c);
       times.push((new Date(r.t)).toISOString().substring(0,10));
   });
   
    let obj = {
        "ticker": ticker,
        "prices": close,
        "times": times,
        "from":from,
        "to":to
    };  

    await toCache(obj);
    
    return obj;

   }
exports.priceHistory=priceHistory;


getReturns = function (prices){
    return div(sub(shift(prices),prices),prices);
}
exports.getReturns=getReturns;

getAverageReturn = (prices) => mean(getReturns(prices));
exports.getAverageReturn=getAverageReturn;


stats = async function(ticker){
    history = await priceHistory(ticker);
    prices = history.prices;
    closing = prices[prices.length-1];
    opening = prices[0];
    returns = await getReturns(prices);
    stdev = Math.sqrt(variance(returns));
    points = [];

    for(i=0;i<prices.length;i++) points.push({
        time:history.times[i],
        price:prices[i]
    });
    
    return {
        "from":history.from,
        "to":history.to,
        "length":prices.length,
        "opening":opening,
        "closing":closing,
        "return": (closing-opening)/opening,
        "stdev": stdev,
        "points": points
    }

}
exports.stats = stats;

calculateAUM = function(returns, initialBalance){
    let aum = Array();

    aum.push((1 + returns[0]) * initialBalance);
    for(var i=1;i<returns.length;i++){
        aum.push((1 + returns[i]) * aum[i-1]);
    }
    return aum;
}
exports.calculateAUM = calculateAUM;