const fs = require('fs');
const cheerio = require('cheerio');

const parsingContent = require('./parsingContent');

let $;

// Number of will load content. if become 0, add content to html file.
let count;

function load_main(req, res){
    count = 2;
    console.log('-loadPage: Load main.html');
    fs.readFile('./web/html/main.html', (err, body) => {
        if(err) throw err;
        
        $ = cheerio.load(body,{xmlMode: true});
        parsingContent.events(true, (result)=>{
            $('#div_events').html(result);
            count--;
            add_to_html(res);
        });
        parsingContent.update(true, cheerio, (result)=>{
            $('#div_update').html(result);
            count--;
            add_to_html(res);
        });
    });
}

function add_to_html(res){
    if(count == 0){
        console.log('-loadPage: Write the result to /');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write($.html());
        res.end();
        console.log('-loadPage: Done!\n');
    }
}

module.exports = {
    main: load_main
};
