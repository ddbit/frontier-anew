var {expect}    = require("chai");
const { default: DataFrame } = require("dataframe-js");
const calculateCorrelation = require("calculate-correlation");


describe("correlation functions", function() {

    it("correlate dataframe of return", async function() {

        // given 4 points: (2,3), (5,3), (4,6) and (1,7)
        const x = [2, 5, 4, 1];
        const y = [3, 7, 6, 2];



        const df = new DataFrame({
            column1: [3, 6, 8, 3], // <------ A column
            column2: [3, 4, 5, 6],
        }, ['X', 'Y']);

        var d = df.toDict();
        //console.log(d);
        
        const correlation = calculateCorrelation(d.X, d.Y);
        console.log("***");
        console.log(correlation); // logs -0.442807443
        


    });

});