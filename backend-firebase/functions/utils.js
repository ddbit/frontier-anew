const {restClient} = require("@polygon.io/client-js");
const { variance } = require("simple-statistics");
const {polygonKey} = require("./credentials");


sub = function (a,b){
    return a.map((e,i) => e - b[i]);
}

div = function (a,b){
    return a.map((e,i) => e / b[i]);
}

shift = function (a){
    //padded with last val
    let r = a.slice(1);
    console.log(r);
    r.push(a[a.length - 1]);
    return r;
}

exports.sub=sub;
exports.div=div;
exports.shift=shift;



priceHistory = async function (ticker){
    const api = restClient(polygonKey);
    let to = new Date();
    let from = ((date) => {
        date.setDate(to.getDate() - 30);
        return date;
       }
     )(new Date());
   
    
    //console.log(to.toISOString()); 
    //console.log(from.toISOString());
    // Output: Tue Jul 21 2020 10:01:14 GMT+0100 (UK Daylight Time) 
   
   
   
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
       times.push(r.t);
   });
   
    return {
        "prices": close,
        "times": times,
        "from":from,
        "to":to
    };   
   }
exports.priceHistory=priceHistory;


getReturns = function (prices){

    //prices = await exports.getPrices(ticker);
    return div(sub(shift(prices),prices),prices);
}
exports.getReturns=getReturns;

stats = async function(ticker){
    history = await priceHistory(ticker);
    prices = history.prices;
    closing = prices[prices.length-1];
    opening = prices[0];
    returns = await getReturns(prices);
    stdev = Math.sqrt(variance(returns));

    return {
        "from":history.from,
        "to":history.to,
        "length":prices.length,
        "opening":opening,
        "closing":closing,
        "return": (closing-opening)/opening,
        "stdev": stdev,
        "prices":prices,
        "times": history.times
    }

}
exports.stats = stats;