//Modern Portfolio Theory module
const { tickers } = require("@polygon.io/client-js/lib/rest/reference/tickers");
const {cov,variance,mean} = require("simple-statistics");
var DataFrame = require('dataframe-js').DataFrame
const {priceHistory} = require("./utils");



class Portfolio{
    constructor(initialBalance,tickers,days){
        this.days=(days == undefined)?30:days;
        this.weights = Array(tickers.length);
        for(let i=0;i<tickers.length;i++) this.weights[i] = 1/tickers.length;
        this.tickers=tickers;
        this.initialBalance=initialBalance;
        this.initTime();
    }



    initTime=function(){
        let t = [];
        
        for(let i=0;i<this.days;i++){
            let d=new Date(); 
            d.setDate(d.getDate() - this.days + i);
            t.push(d.toISOString().substring(0,10));
        }
        this.data = new DataFrame({
            time: t // <------ Time column
        }, ['time']);
    }

    allocate = async function () {
        for(let k=0;k<this.tickers.length;k++){
            let ticker = this.tickers[k];
            console.log(ticker);
            let h = await priceHistory(ticker);
            
            let df = new DataFrame({
                time: h.times, // <------ Time column
                ticker: h.prices
            }, ['time',ticker]);
            this.data = this.data.join(df,"time");

        }
    }

}




const testDF = async function(){
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


const testPortfolio=async function(){
    p = new Portfolio(1000000,["X:BTCUSD","IAU","BNO"]);
    console.log(p.initialBalance);
    console.log(p.weights);
    console.log(p.days);
    await p.allocate();
    p.data.show();
}

testPortfolio();