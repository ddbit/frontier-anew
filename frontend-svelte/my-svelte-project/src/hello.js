const {baseurl, postfix} = require("./config"); 
var DataFrame = require('dataframe-js').DataFrame
exports.hello = function(name){
    return {"name":name};
}

let load = async function(ticker){
   let r = await fetch(baseurl+ticker+postfix);
   r = r.json();
   return r;
}
exports.load = load;