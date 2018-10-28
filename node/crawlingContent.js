const request = require('request');

module.exports = (url, callback)=>{
    request(url, (err, res, data) => {
        if(err) {throw err};
        return callback(data);
    });
};