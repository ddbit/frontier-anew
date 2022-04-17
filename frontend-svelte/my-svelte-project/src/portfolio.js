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



let getReturns = function (prices){
    return div(sub(shift(prices),prices),prices);
}
exports.getReturns = getReturns;

let fetchHistory = function (tickers, days) {
    let t = [];
        
    for(let i=0;i<days;i++){
        let d=new Date(); 
        d.setDate(d.getDate() - days + i);
        t.push(d.toISOString().substring(0,10));
    }
    let data = new DataFrame({
        time: t // <------ Time column
    }, ['time']);

    for(let k=0;k<tickers.length;k++){
        let ticker = tickers[k];
        console.log("fetching ..."+ticker);
        (async ()=>{
            let h = await fetch(baseurl + ticker + postfix);
            h = h.json();
            console.log("h");
            console.log(h);
            let df = new DataFrame({
                time: h.times, // <------ Time column
                ticker: getReturns(h.prices)
            }, ['time',ticker]);
            data = data.join(df,"time");
        })();
    }
    //df4=df3.map(row => row.set('out', dot(row.toArray().slice(1),weights)));
    return data;
}
exports.fetchHistory = fetchHistory;


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

    getData = async function () {
        return await this.data;
    }



    calculateReturns = function(){
        this.data=
        this.data.map(row => row.set('return', dot(row.toArray().slice(1),this.weights)));
        this.stdev = this.data.stat.sd("return");
        return this;
    }

    calculateAUM = function(){

        var _calculateAUM = function(returns, initialBalance){
            let aum = Array();
        
            aum.push((1 + returns[0]) * initialBalance);
            for(var i=1;i<returns.length;i++){
                aum.push((1 + returns[i]) * aum[i-1]);
            }
            return aum;
        }

        this.aum=_calculateAUM(column(this.data, "return"),this.initialBalance);
        return this;
    }
}






let init = function(x){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
}
exports.init = init;

exports.PORTFOLIO_CONST="PORTFOLIO_CONST";

//testPortfolio();
//testDF();