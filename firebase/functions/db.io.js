const { Client } = require('pg');
const {dbKey} = require ('./credentials');


exports.queryPrices = async function(){
// Create a client using the connection information provided on bit.io.
    const client = new Client({
        user: 'ddbit',
        host: 'db.bit.io',
        database: 'ddbit/closing', // public database 
        password: dbKey, // key from bit.io database page connect menu
        port: 5432,
        ssl: true,
    });
    client.connect();    
    let res = await client.query('SELECT * FROM "prices" limit 10;');
    console.log(res);
    client.end();
}

exports.insertPrices = async function(){
/*
    INSERT INTO table_name
    VALUES (value1, value2, value3, ...);
*/
// Create a client using the connection information provided on bit.io.
    const client = new Client({
        user: 'ddbit',
        host: 'db.bit.io',
        database: 'ddbit/closing', // public database 
        password: dbKey, // key from bit.io database page connect menu
        port: 5432,
        ssl: true,
    });
    client.connect();  

    let q = 
        "INSERT INTO prices(ticker, price, datetime) "+
        "VALUES ('AU',10000,'2022-08-08');"
    console.log(q)
    let res = await client.query(q);
    console.log(res);
    client.end();
}