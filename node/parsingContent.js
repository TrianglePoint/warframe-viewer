const loadContent = require('./loadContent');

function parse_events(callback){
    loadContent((data)=>{
        let obj = JSON.parse(data);
        console.log('Length of "Events" : ' + obj.Events.length);
        var result = "";
        for(var i = 0; i < obj.Events.length; i++){
            
            // Store the location of english and korean message.
            var en_ko = [-1, -1];
            result += '<p><a href="' + obj.Events[i].Prop +
                '" target="_blank">';
            
            // Find english and korean message.
            for(var j = 0; j < obj.Events[i].Messages.length; j++){
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
            result += obj.Events[i].Messages[en_ko[0]].Message +
                '</a></p>';
        }
        console.log('Created event element.');
        return callback(result);
    });                             
}

module.exports = {
    events: parse_events,
    
    // below is temp.
    all: (callback)=>{
        loadContent((data)=>{
            let obj = JSON.parse(data);
            return callback(obj);
        });
    }
};