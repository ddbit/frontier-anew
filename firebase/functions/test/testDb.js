
//var {expect}    = require("chai");
var {queryPrices, insertPrices} = require("../db.io");

describe("DB operations", function() {
    it("insert db", async function() {
        await insertPrices();
    });
    
    it("query db", async function() {
        await queryPrices();
    });


});
