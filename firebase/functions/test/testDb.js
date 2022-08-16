
//var {expect}    = require("chai");
var {queryPrices} = require("../db.io");

describe("DB operations", function() {
    it("query db", async function() {
        await queryPrices();
    });
});
