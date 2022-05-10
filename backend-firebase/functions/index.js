const functions = require("firebase-functions");
const {stats, priceHistory} = require("./utils.js");
const {Portfolio} = require("./mpt.js");
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
   priceHistory(ticker).then(data=>response.send(data));
   //response.send(await stats(ticker));
});




