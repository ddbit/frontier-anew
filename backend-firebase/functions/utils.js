const {restClient} = require("@polygon.io/client-js");
const { variance, mean } = require("simple-statistics");
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
       times.push((new Date(r.t)).toISOString().substring(0,10));
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


main=async function(){
    console.log(await priceAtDate("AAPL","2020-10-16"));
    console.log(await priceAtDate("AAPL","2020-10-17"));
    console.log(await priceHistory("AAPL"))
}

main ();