// test/converter.js

var {expect}    = require("chai");
var {priceHistory} = require("../utils.js");

describe("Utils", function() {

    it("fecth price history", async function() {
        let h = await priceHistory("X:ETHUSD",90);
        console.log(h);
    });

});