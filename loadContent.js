var request = require('request');
        
var url = 'http://content.warframe.com/dynamic/worldState.php';

module.exports = (callback)=>{
    request(url, (err, res, data) => {
        if(err) {throw err};
        return callback(data);
    });
};