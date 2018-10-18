const express = require('express');
const app = express();
const parsingContent = require('./node/parsingContent');
const loadPage = require('./node/loadPage');
let port = process.env.PORT;

//fs is remove at after.
const fs = require('fs');

function onRequest(req, res){    
    parsingContent.event((subject, link)=>{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.write('<a href="' + link + '"target="_blank">' + 
                  subject + '</a>');
        res.end();
    });
}
function allRequest(req, res){
    parsingContent.all((data)=>{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        
        // fs is remove at after.
        let json = JSON.stringify(data,null,4);
        fs.writeFile('./json/warframe_state.json', json,'utf8')
        res.write(json);
        res.end();
    });
}

app.get('/', loadPage.main);
app.get('/test', onRequest);
app.get('/json', allRequest);
app.listen(port, ()=>{
   console.log('Listening on port ' + port + '\n'); 
});

//https://warframestat.us/
//https://docs.warframestat.us/

//http://www.nextree.co.kr/p8574/

