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



exports.stats = functions.https.onRequest((request, response) => {
    functions.logger.info("Stats 30 days!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    var ticker = request.query.ticker;
    stats(ticker).then(data=>response.send(data));
    //response.send(await stats(ticker));
 });

 exports.history = functions.https.onRequest((request, response) => {
    functions.logger.info("Prices 30 days!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    var ticker = request.query.ticker;
    priceHistory(ticker).then(data=>response.send(data));
    //response.send(await stats(ticker));
 });


 exports.portfolio = functions.https.onRequest((request, response) => {
    functions.logger.info("Portfolio", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    var tickers = request.query.tickers.split(",");
    var weights = request.query.weights.split(",").map(x=>Number(x));
    //response.send({
    //    tickers: tickers.split(",");
    //    weights: weights.split(",").map(x=>Number(x));
    //});
    //response.send(await stats(ticker));
    let p = new Portfolio(tickers,weights);
    p.fetchHistory().
    then(()=>response.send({
        "tickers":p.tickers,
        "weights":p.weights,
        "stdev":p.stdev, 
        "aum":p.aum}));

    
 });


