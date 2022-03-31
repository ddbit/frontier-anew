//Modern Portfolio Theory module
const {cov,variance,mean} = require("simple-statistics");
const {getReturns, getAverageReturn} = require("./utils.js");
/**
 * 
 * @param {*} df is a dataframe object with the following structure
 * {"ticker":[price,price,...price], "ticker":[price,price,...price],...}
 * the array [price,price,...,price] contains the last N closing prices 
 * for the asset ticker
 */





const naivePortfolio = function(df){
    Object.keys(df).forEach(ticker => {
        console.log(ticker);
        let prices = df[ticker];
        console.log(prices);
        console.log(getReturns(prices));
        let R=getAverageReturn(prices);
        console.log(R);
    });

}

exports.naivePortfolio = naivePortfolio;

const stdev = function(sigma, weights){
    let [w1,w2,w3] = weights;
    let [s1,s2,s3] = sigma;
    return 
        w1**2 * s1**2 +
        w2**2 * s2**2 +
        w3**2 * s3**2 +
        2*w1*w2*s1*s2*cov()

}


const main = function(){
    const df={"a":[1,2,3],"b":[4,5,6]};
    naivePortfolio(df);
}

main();