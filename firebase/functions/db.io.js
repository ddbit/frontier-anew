const { Client } = require('pg');
const {dbKey} = require ('./credentials');

// Create a client using the connection information provided on bit.io.
var client = new Client({
    user: 'ddbit',
    host: 'db.bit.io',
    database: 'ddbit/closing', // public database 
    password: dbKey, // key from bit.io database page connect menu
    port: 5432,
    ssl: true,
});
client.connect();

exports.queryPrices = async function(){
    let res = await client.query('SELECT * FROM "prices" limit 10;');
    console.log(res);
}
