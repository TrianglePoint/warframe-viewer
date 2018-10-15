const express = require('express');
const app = express();
const parsingContent = require('./parsingContent');
let port = 3000;

function onRequest(req, res){    
    parsingContent.event((subject, link)=>{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.write('<a href="' + link + '"target="_blank">' + 
                  subject + '</a>');
        res.end();
    });
}

app.get('/', onRequest);
app.listen(port, function(){
   console.log('Listening on port ' + port); 
});

//https://warframestat.us/
//https://docs.warframestat.us/

//http://www.nextree.co.kr/p8574/

