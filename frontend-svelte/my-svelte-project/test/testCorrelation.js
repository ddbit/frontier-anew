var {expect}    = require("chai");
const {correlationMatrix} = require('../src/correlation');
const { default: DataFrame } = require("dataframe-js");

describe("correlation functions", function() {

    it("correlate dataframe of return", async function() {

        const dfr = new DataFrame({
            X: [3, 6, 8, 3], // <------ A column
            Y: [3, 4, 5, 6],
            Z: [3, 3, 2, 2]
        }, ['X', 'Y' , 'Z']);


        
        console.log(correlationMatrix(dfr));
        


    });

});