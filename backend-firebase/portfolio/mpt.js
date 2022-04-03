//Modern Portfolio Theory module
var DataFrame = require('dataframe-js').DataFrame
const {priceHistory,getReturns} = require("./utils");



class Portfolio{
    constructor(tickers,weights,days){
        this.days=(days == undefined)?30:days;
        this.weights = weights;
        this.tickers=tickers;
        this.initTime();
        this.aum=100;
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

    fetchHistory = async function () {
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
        //df4=df3.map(row => row.set('out', dot(row.toArray().slice(1),weights)));
        this.data=
        this.data.map(row => row.set('return', dot(row.toArray().slice(1),this.weights)));

    }


}




const testDF = async function(){
// From a dictionnary (Hash)

    //h1 = await priceHistory("X:BTCUSD");
    //h2 = await priceHistory("AAPL");
    times = [1,2,3,4,5];
    weights = [.6,.4];
    X=[2,2,2,3,3];
    Y=[1,1,2,2,2];
    const df = new DataFrame({
    
    time: times, // <------ A column
    X: X,
    }, ['time', 'X']);

    const df2 = new DataFrame({
    
        time: times, // <------ A column
        Y: Y,
        }, ['time', 'Y']);
    df.show();
    df2.show();
    df3=df.join(df2,"time");
    df3.show();
    df4=df3.map(row => row.set('out', dot(row.toArray().slice(1),weights)));
    df4.show();
}


const testPortfolio=async function(){
    p = new Portfolio(["X:BTCUSD","IAU","BNO"],[0,1,0]);
    console.log(p.weights);
    console.log(p.days);
    await p.fetchHistory();
    p.data.show();
    //first
}

testPortfolio();
//testDF();