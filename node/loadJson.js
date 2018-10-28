const cheerio = require('cheerio');

const parsingContent = require('./parsingContent');

let json = {};

// Number of will load content. if become 0, add content to html file.
let count;

function load_main(req, res){
    count = 2;
    
    parsingContent.events(false, (result)=>{
        json.events = result;
        count--;
        send_to_json(res);
    });
    parsingContent.update(false, cheerio, (result)=>{
        json.update = result;
        count--;
        send_to_json(res);
    });
}

function send_to_json(res){
    if(count == 0){
        console.log('-loadJson: Send the result to /json');
        res.write(JSON.stringify(json));
        res.end();
        console.log('-loadJson: Done!\n');
    }
}

module.exports = {
    main: load_main
};
