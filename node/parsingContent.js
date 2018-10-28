const crawlingContent = require('./crawlingContent');

const url_link = {
    json: 'http://content.warframe.com/dynamic/worldState.php',
    forum: 'https://forums.warframe.com/forum/3-pc-update-build-notes.xml/'
};

function parse_events(isHtml, callback){
    crawlingContent(url_link.json,(data)=>{
        const obj = JSON.parse(data);
        console.log('--parsingContent: Number of "Events": ' + obj.Events.length);
        let result;
        if(isHtml){
            result = "";
        }else{
            //JSON
            result = [];
        }
        for(let i = 0; i < obj.Events.length; i++){
            
            // Store the location of english and korean message.
            let en_ko = [-1, -1];
            if(isHtml){
                result += '<p><a href="' + obj.Events[i].Prop +
                    '" target="_blank">';
            }
            
            // Find english and korean message.
            for(let j = 0; j < obj.Events[i].Messages.length; j++){
                if(en_ko[0] == -1 && obj.Events[i].Messages[j].LanguageCode == 'en'){
                    en_ko[0] = j;
                }
                if(en_ko[1] == -1 && obj.Events[i].Messages[j].LanguageCode == 'ko'){
                    en_ko[1] = j;
                }
            }
            
            // If exist the korean message?
            if(en_ko[1] != -1){
                en_ko[0] = en_ko[1];
            }
            
            // No english, no korean.
            if(en_ko[0] == -1){
                en_ko[0] = 0;
            }
            if(isHtml){
                result += obj.Events[i].Messages[en_ko[0]].Message +
                    '</a></p>';
            }else{
                //JSON
                result.push({subject:obj.Events[i].Messages[en_ko[0]].Message, link:obj.Events[i].Prop});
            }
        }
        console.log('--parsingContent: Created event element.');
        return callback(result);
    });                             
}

function parse_update(isHtml, cheerio, callback){
    crawlingContent(url_link.forum, (body)=>{
        const $ = cheerio.load(body,{xmlMode: true});
        let result;
        if(isHtml){
            result = "";
        }else{
            //JSON
            result = [];
        }
        // Number of display.
        let numUpdate = 5;
        console.log('--parsingContent: Number of find the update: ' + numUpdate);
        const link = $('item');
        
        link.each(function(index, elem){
            if(numUpdate == 0){    
                // End loop of .each()
                return false;
            }
            if(isHtml){
                result += '<p><a href="' + $('link', this).text() + '" target="_blank">' + $('title', this).text() + '</a></p>';
            }else{
                //JSON
                result.push({subject: $('title', this).text(), link: $('link', this).text()});
            }
            numUpdate--;
        });
        console.log('--parsingContent: Created update element.');
        return callback(result);
    });                             
}

module.exports = {
    events: parse_events,
    update: parse_update
};