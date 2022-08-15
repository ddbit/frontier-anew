
var {expect}    = require("chai");
var {queryPrices} = require("../utils.js");

describe("DB operations", function() {
    it("query db", async function() {
        await queryPrices();
    });
});
