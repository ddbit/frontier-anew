// test/converter.js

var {expect}    = require("chai");
var {priceHistory, writePrices, readPrices, writeAll} = require("../utils.js");

describe("Utils", function() {

    it("fecth price history", async function() {
        let h = await priceHistory("NDAQ",90);
        console.log(h);
    });

    it("write/read price history to storage", async function() {
        let obj = {"x":123};
        writePrices("NDAQ",obj);
        let data =  await readPrices("IAU");
        console.log(data);  
        expect(data).to.be.deep.equal(obj);
    });

    it("writeAll in storage", async function() {
        writeAll(["NDAQ","X:BTCUSD","BNO"],90);
    });



});