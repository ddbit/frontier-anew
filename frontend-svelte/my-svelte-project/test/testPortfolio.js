// test/converter.js

var {expect}    = require("chai");
const { default: DataFrame } = require("dataframe-js");
var {sub,
    div,
    shift,
    mul,
    dot, 
    corr,
    load, 
    getReturns, 
    calculateAUM, 
    createPriceDataframe, 
    createReturnsDataframe, 
    calculateGlobalReturns} = require("../src/portfolio");

describe("portfolio functions", function() {

    it("load asset prices", async function() {
        let data = await load("IAU");
        console.log("**** **** **** ****");
        console.log(data);
    });

    it("element wise subtract of arrays", function() {
        let a = [1,2,3,4];
        let b = [1,1,1,2];
        let c = [0,1,2,2];
        expect(sub(a,b)).to.deep.equal(c);
    });

    it("element wise divide of arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = [1,2,3,2,0.6];
        expect(div(a,b)).to.deep.equal(c);
    });

    it("element wise mul of arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = [1,2,3,8,15];
        expect(mul(a,b)).to.deep.equal(c);
    });

    it("dot product between 2 arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = 29;
        expect(dot(a,b)).to.deep.equal(c);
    });

    it("shift of arrays by one", function() {
        let a = [1,2,3,4,3];
        let b = [2,3,4,3,3];

        expect(shift(a)).to.deep.equal(b);
    
    });

    it("calculate correlations", async function() {
        a=[0.1,0.3,-0.2,0.05,-0.08];
        b=[0.0,-0.3,-0.2,0.05,0.08];
        c=[-0.1,0.03,0.2,0.05,-0.08];
        d=[0.01,0.1,-0.2,0.05,0.08];

        console.log( corr (a,b) );
    });

    it("calculate returns from prices", async function() {
        let prices = [100,110,121]
        expect(getReturns(prices)).to.deep.equal([0.1,0.1,0]);
        prices = [100,90,81]
        expect(getReturns(prices)).to.deep.equal([-0.1,-0.1,0]);
    });

    it("calculate aum over time from returns", async function() {
        let returns = [0.05,0.2,0.2];
        let expectedAUM = [100,105,126];
        let df=new DataFrame({'return':returns},['return']);
        df = calculateAUM(df,100);
        df.show();
        let aum = df.toDict().aum;
        expect(aum).to.deep.equal(expectedAUM);
    });

    it("create price dataframe and returns dataframe", async function() {
        let tickers = ["X:BTCUSD","BNO","IAU"];
        let weights = [1/3,1/3,1/3]
        let pdf=await createPriceDataframe(tickers);
        pdf.show();

        let rdf = createReturnsDataframe(pdf);
        rdf.show();

        let grdf = calculateGlobalReturns(rdf,weights);
        grdf.show();

    });



});