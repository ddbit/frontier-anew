const {restClient} = require("@polygon.io/client-js");
const {polygonKey} = require("./credentials");
const fs = require('fs');


const priceHistory = async function (ticker, days){
    let period = days;
    console.log(period);
    const api = restClient(polygonKey);
    let to = new Date();
    let from = ((date) => {
        date.setDate(to.getDate() - (period===undefined?30:period));
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


const writePrices=function(ticker, prices){
    fs.writeFileSync('./bucket/'+ticker+'.json', JSON.stringify(prices));
}
exports.writePrices = writePrices;

const readPrices=async function(ticker){
    let data =  fs.readFileSync('./bucket/'+ticker+'.json','utf-8');
    console.log(data);
    return JSON.parse(data);
}
exports.readPrices=readPrices;

const writeAll = async function(tickers, days){
    tickers.forEach(async t=>{
        let prices = await priceHistory(t,days);
        writePrices(t,prices);
    });
}
exports.writeAll = writeAll;



const { Client } = require('pg');





exports.queryPrices = async function(){
    // Create a client using the connection information provided on bit.io.
    var client = new Client({
        user: 'ddbit',
        host: 'db.bit.io',
        database: 'ddbit/prices', // public database 
        password: 'v2_3tPGg_SB7uJrmJCr6wSETY4HKQmtc', // key from bit.io database page connect menu
        port: 5432,
        ssl: true,
    });
    client.connect();
    let res = await client.query('SELECT * FROM "prices" limit 10;');
    console.log(res);
}