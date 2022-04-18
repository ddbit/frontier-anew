//exports.baseurl = "http://localhost:5001/frontier-eb43f/us-central1"
const axios = require('axios');
//exports.baseurl = "https://us-central1-frontier-eb43f.cloudfunctions.net"
exports.baseurl = "https://firebasestorage.googleapis.com/v0/b/frontier-eb43f.appspot.com/o/.cache%2F";
exports.postfix = ".json?alt=media";
let getWithAxios = async function(url){
    let res = await axios.get(url);
    let data = res.data;
} 

let getWithFetch = async function(url){
    let r = await fetch(url);
    return r.json();
};

exports.GET = getWithAxios;
