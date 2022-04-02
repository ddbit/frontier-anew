//Modern Portfolio Theory module
var DataFrame = require('dataframe-js').DataFrame
const {priceHistory,getReturns} = require("./utils");



class Portfolio{
    constructor(tickers,weights,days){
        this.days=(days == undefined)?30:days;
        this.weights = weights;
        this.tickers=tickers;
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

    fetchPriceHistory = async function () {
        for(let k=0;k<this.tickers.length;k++){
            let ticker = this.tickers[k];
            console.log(ticker);
            let h = await priceHistory(ticker);
            
            let df = new DataFrame({
                time: h.times, // <------ Time column
                ticker: getReturns(h.prices)
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
    p = new Portfolio(["X:BTCUSD","IAU","BNO"],[1/3,1/3,1/3]);
    console.log(p.weights);
    console.log(p.days);
    await p.fetchPriceHistory();
    p.data.show();
    //first
}

testPortfolio();