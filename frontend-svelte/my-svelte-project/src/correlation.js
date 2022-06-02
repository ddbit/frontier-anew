// import the fn
const calculateCorrelation = require("calculate-correlation");
const { default: DataFrame } = require("dataframe-js");


const correlationMatrix=function(aDataframe){    
    //console.log(aDataframe);
    var df;
    //if time is a column must be dropped
    try {
        df = aDataframe.drop("time");
    } catch (error) {
        console.log("no time column found");
        df = aDataframe;
    }
   

    var d = df.toDict();
    var keys = Object.keys(d);
    var matrix=[];
    
    for(var i = 0; i<keys.length; i++){
        var row = [];
        matrix.push(row);
        for(var j = 0; j<keys.length; j++){
            row.push(calculateCorrelation(d[keys[i]],d[keys[j]]));
        }
    }
    return {'data':matrix, 'meta':keys};
}

exports.correlationMatrix = correlationMatrix;