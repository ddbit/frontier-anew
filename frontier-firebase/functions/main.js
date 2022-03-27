const {restClient} = require("@polygon.io/client-js");


async function closeArray(){
 const api = restClient("who5oAF5P5GAYuy8pjWZ3dC47a9rTOP5");


 let to = new Date();
 let from = ((date) => {
     date.setDate(to.getDate() - 30);
     return date;
    }
  )(new Date());

 
 console.log(to.toISOString()); 
 console.log(from.toISOString());
 // Output: Tue Jul 21 2020 10:01:14 GMT+0100 (UK Daylight Time) 



 var response = //await api.forex.previousClose("C:EURUSD");
 await api.crypto.aggregates(
    "X:BTCUSD",
    1,
    "day",
    from.toISOString().substring(0,10),
    to.toISOString().substring(0,10),
    true
);

let close = [];
response.results.forEach(r => {
    //console.log(r.c);
    close.push(r.c);
});

console.log(close);

}

function addVector(a,b){
    return a.map((e,i) => e + b[i]);
}

function mulVector(a,b){
    return a.map((e,i) => e * b[i]);
}

function divideVector(a,b){
    return a.map((e,i) => e / b[i]);
}

function shiftVector(a,n){

}

async function main(){
    console.log("main");
    //await closeArray();
    console.log(divideVector([1,2,3],[2,2,2]));
}

main();

