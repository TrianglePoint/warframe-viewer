const fs = require('fs');
const cheerio = require('cheerio');

const parsingContent = require('./parsingContent');

function load_main(req, res){
    fs.readFile('./web/html/main.html', (err, data) => {
        if(err) throw err;
        console.log('Loaded file.');
        
        const $ = cheerio.load(data);
        parsingContent.events((result)=>{
            $('#div_events').html(result);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            console.log($.html());
            res.write($.html());
            res.end();
        });
    });
}

module.exports = {
    main: load_main
};