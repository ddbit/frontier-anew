const functions = require("firebase-functions");
const {readPrices, writeAll} = require("./utils.js");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    response.send({"x":request.query.x});   
 });

exports.prices = functions.https.onRequest((request, response) => {
   functions.logger.info("Prices 30 days!", {structuredData: true}); 
   response.setHeader("Access-Control-Allow-Origin","*");
   var ticker = request.query.ticker;
   readPrices(ticker).then(data=>response.send(data));
   //response.send(await stats(ticker));
});


exports.updateLocalStorage = functions.https.onRequest((request, response) => {
   functions.logger.info("Prices 30 days!", {structuredData: true}); 
   response.setHeader("Access-Control-Allow-Origin","*");
   const tickers = ["IAU","BNO","X:BTCUSD"];
   writeAll(tickers,90).then(_=>response.send({"update":"ok"}));
   //response.send(await stats(ticker));
});

exports.updateLocalStorageScheduled = functions.pubsub.schedule('every 1 day').onRun(async (context) => {
   console.log('This will be run every day!');
   response.setHeader("Access-Control-Allow-Origin","*");
   const tickers = ["IAU","BNO","X:BTCUSD"];
   writeAll(tickers,90).then(_=>console.log("update done!"));
 });
 



