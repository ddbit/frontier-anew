// test/converter.js

var {expect}    = require("chai");
var {sub,div,shift,fromCache,toCache, getReturns} = require("../utils");

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

    it("element wise mul of arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = [1,2,3,8,15];
        expect(mul(a,b)).to.deep.equal(c);
    
    });

    it("dot product between 2 arrays", function() {
        let a = [1,2,3,4,3];
        let b = [1,1,1,2,5];
        let c = 29;
        expect(dot(a,b)).to.deep.equal(c);
    
    });

    it("shift of arrays by one", function() {
        let a = [1,2,3,4,3];
        let b = [2,3,4,3,3];

        expect(shift(a)).to.deep.equal(b);
    
    });

    it("save/retrieve object in cache", async function() {
        let obj = {ticker:"x", time:[1,2,3], price:[100,102,95]};
        await toCache(obj);
        let cached = await fromCache("x");
        expect(cached).to.deep.equal(obj);
    
    });

    it("if obj not in cache get undefined", async function() {
        let cached = await fromCache("y");
        expect(cached).to.equal(undefined);
    
    });

    it("calculate returns from prices", async function() {
        let prices = [100,110,121]
        expect(getReturns(prices)).to.deep.equal([0.1,0.1,0]);
    
        prices = [100,90,81]
        expect(getReturns(prices)).to.deep.equal([-0.1,-0.1,0]);
    });

});