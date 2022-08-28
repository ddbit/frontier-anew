const {restClient} = require("@polygon.io/client-js");
const {polygonKey} = require("./credentials");


const doFetch = async function (ticker, days){
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
exports.doFetch=doFetch;