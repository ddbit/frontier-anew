const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true}); 
    response.setHeader("Access-Control-Allow-Origin","*");
    response.send([{"a":1},{"a":2},{"a":3}]);   
 });

