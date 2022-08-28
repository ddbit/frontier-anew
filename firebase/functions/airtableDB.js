var Airtable = require('airtable');
const { airtableKey } = require('./credentials');

var base = new Airtable({apiKey: airtableKey}).base('appVprtQEcZhOl55e');


const query = function(ticker, days, done){
    var res=[];
    base(ticker).select({
        // Selecting the first 3 records in Grid view:
        maxRecords: days,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Datetime'));
            console.log('Retrieved', record.get('Price'));
  
            res.push({
                Datetime: record.get('Datetime'),
                Price: record.get('Price')
            });
        });

        done(res);
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        //fetchNextPage();
        
    
    }, function done(err) {
            if (err) { console.error(err); 
            return; 
        }
    });
}


exports.query = query;


const insertOne = function(ticker, datetime, price, done){
    base(ticker).create([
        {
          "fields": {
            "Datetime": datetime,
            "Price": price
          }
        }], done);
    
}
exports.insertOne = insertOne;
