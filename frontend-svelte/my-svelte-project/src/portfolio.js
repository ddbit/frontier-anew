const { baseurl, postfix } = require('./config');
var DataFrame = require('dataframe-js').DataFrame

let sub = function (a,b){
    return a.map((e,i) => e - b[i]);
}

let div = function (a,b){
    return a.map((e,i) => e / b[i]);
}

let mul = function (a,b){
    return a.map((e,i) => e * b[i]);
}

let dot = function(a,b){
    let x = mul(a,b);
    return x.reduce((s,x)=>s+x)
}



let shift = function (a){
    //padded with last val
    let r = a.slice(1);
    //console.log(r);
    r.push(a[a.length - 1]);
    return r;
}

exports.sub=sub;
exports.div=div;
exports.shift=shift;
let column = function(df, colName){
    let a = df.select(colName).toArray();
    let b = [];
    a.forEach(x=>b.push(x[0]));
    return b;
}

let getReturns = function (prices){
    return div(sub(shift(prices),prices),prices);
}
exports.getReturns=getReturns;

class Portfolio{
    constructor (tickers,weights,days){
        this.days=(days == undefined)?30:days;
        this.weights = weights;
        this.tickers=tickers;
        this.initTime();
        this.initialBalance=100;
        this.stdev=0;
        this.aum = [];
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
            console.log("fetching ...");
            console.log(ticker);
            fetch(baseurl + ticker + postfix).then(
                (h)=>{console.log(h);
                    let df = new DataFrame({
                        time: h.times, // <------ Time column
                        ticker: getReturns(h.prices)
                    }, ['time',ticker]);
                    this.data = this.data.join(df,"time");}
            );
        }
        //df4=df3.map(row => row.set('out', dot(row.toArray().slice(1),weights)));
        this.data=
        this.data.map(row => row.set('return', dot(row.toArray().slice(1),this.weights)));
        this.stdev = this.data.stat.sd("return");
        this.aum=calculateAUM(column(this.data, "return"),this.initialBalance);
    }
}
exports.Portfolio = Portfolio;




//testPortfolio();
//testDF();