// test/converter.js

var {expect}    = require("chai");
var {priceHistory, writePrices, readPrices} = require("../utils.js");

describe("Utils", function() {
    it("fecth price history", async function() {
        let h = await priceHistory("IAU");
        //console.log(h);
        //expect(sub(a,b)).to.deep.equal(c);
    
    });

    it("write/read price history to storage", async function() {
        writePrices("IAU",{"x":123});
        let data =  await readPrices("IAU");
        console.log("***");
        console.log(data);  
    });

    it("writeAll in storage", async function() {
        writeAll(["IAU","X:BTCUSD","BNO"]);
    });


});