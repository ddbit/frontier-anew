const fs = require('fs');


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









