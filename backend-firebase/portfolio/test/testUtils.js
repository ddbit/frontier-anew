// test/converter.js

var {expect}    = require("chai");
var {sub,div,shift} = require("../utils");

describe("Utils", function() {
    it("element wise subtract of arrays", function() {
        let a = [1,2,3,4];
        let b = [1,1,1,2];
        let c = [0,1,2,2];
        expect(sub(a,b)).to.deep.equal(c);
    
    });
    it("element wise divide of arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = [1,2,3,2,0.6];
        expect(div(a,b)).to.deep.equal(c);
    
    });
    it("shift of arrays by one", function() {
        let a = [1,2,3,4,3];
        let b = [2,3,4,3,3];

        expect(shift(a)).to.deep.equal(b);
    
    });
});