//Modern Portfolio Theory module
const {cov,variance,mean} = require("simple-statistics");
var DataFrame = require('dataframe-js').DataFrame
const {priceHistory} = require("./utils");







const main = async function(){
// From a dictionnary (Hash)

    h1 = await priceHistory("X:BTCUSD");
    h2 = await priceHistory("AAPL");

    const df = new DataFrame({
    
    time: h1.times, // <------ A column
    bitcoin: h1.prices,
    }, ['time', 'bitcoin']);

    const df2 = new DataFrame({
    
        time: h2.times, // <------ A column
        aapl: h2.prices,
        }, ['time', 'aapl']);


    df.show();
    df2.show();

    df3=df.join(df2,"time");
    df3.show();
}

main();