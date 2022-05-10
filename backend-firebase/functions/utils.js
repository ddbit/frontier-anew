const {restClient} = require("@polygon.io/client-js");
const {polygonKey} = require("./credentials");
const fs = require('fs');




priceHistory = async function (ticker){


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
    return obj;
   }
exports.priceHistory=priceHistory;


writePrices=function(ticker, prices){
    fs.writeFileSync('./bucket/'+ticker+'.json', JSON.stringify(prices));
}
exports.writePrices = writePrices;

readPrices=async function(ticker){
    let data =  fs.readFileSync('./bucket/'+ticker+'.json','utf-8');
    console.log(data);
    return data;
}
exports.readPrices=readPrices;

writeAll = async function(tickers){
    tickers.forEach(async t=>{
        let prices = await priceHistory(t);
        writePrices(t,prices);
    });
}
exports.writeAll = writeAll;