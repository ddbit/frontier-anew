const functions = require("firebase-functions");
const {stats} = require("./utils");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    response.send({"x":request.query.x});   
 });


 exports.stats = functions.https.onRequest((request, response) => {
    functions.logger.info("Stats 30 days!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    var ticker = request.query.ticker;
    response.send({"x":ticker});
 });
