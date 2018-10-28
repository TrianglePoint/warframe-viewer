const express = require('express');
const app = express();
const parsingContent = require('./node/parsingContent');
const loadPage = require('./node/loadPage');
const loadJson = require('./node/loadJson');

let port = process.env.PORT;

app.get('/', loadPage.main);
app.get('/json', loadJson.main);
app.listen(port, ()=>{
   console.log('Listening on port ' + port + '\n'); 
});

//https://warframestat.us/
//https://docs.warframestat.us/
