// test/converter.js

var {expect}    = require("chai");
var {doFetch} = require("../fetchPrices.js");

describe("Utils", function() {

    it("fecth prices", async function() {
        let h = await doFetch("X:ETHUSD",90);
        console.log(h);
    });

});