
var {expect}    = require("chai");
var {writePriceData} = require("../utils.js");

describe("DB operations", function() {

    it("write data to db", async function() {
        let obj = {
            "prices":[100,101,110],
            "times": [1,2,3]
        };
        await writePriceData(obj.prices, obj.times);
    });




});
