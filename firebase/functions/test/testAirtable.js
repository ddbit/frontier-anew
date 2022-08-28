var {query,insertOne} = require('../airtableDB');

describe("Airtable storage operations", function() {

    before(async function () {});

    it("store one price in db", async function() {
       insertOne("X","2022-02-01",67.99, (e,r)=>console.log(r) );
    });

    it("select prices from airtable", async function() {
        
        query("BNO",3, r=>console.log(r));
        
    });


});