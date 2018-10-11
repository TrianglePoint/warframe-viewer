var loadContent = require('./loadContent');

module.exports = {
    event: (callback)=>{
        loadContent((data)=>{
            var obj = JSON.parse(data);
            var subject = obj.Events[1].Messages[0].Message;
            var link = obj.Events[1].Prop;
            console.log(link);
            return callback(subject, link);
        });                             
    }
};