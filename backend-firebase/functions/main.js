const {stats} = require("./utils");




async function main(){
    console.log("main");
    const ticker = "X:BTCUSD";
    console.log(await stats(ticker));

}

main();

