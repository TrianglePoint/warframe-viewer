const loadContent = require('./loadContent');

function parse_events(callback){
    loadContent((data)=>{
        let obj = JSON.parse(data);
        console.log('Length of "Events" : ' + obj.Events.length);
        var result = "";
        for(var i = 0; i < obj.Events.length; i++){
            result += '<p><a href="' + obj.Events[i].Prop +
                '" target="_blank">' + obj.Events[i].Messages[0].Message +
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