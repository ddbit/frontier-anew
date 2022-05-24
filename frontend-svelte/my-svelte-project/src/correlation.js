// import the fn
const calculateCorrelation = require("calculate-correlation");

// given 4 points: (2,3), (5,3), (4,6) and (1,7)
const x = [2, 5, 4, 1];
const y = [3, 7, 6, 2];

const correlation = calculateCorrelation(x, y);

console.log(correlation); // logs -0.442807443
console.log(typeof correlation); // logs number

