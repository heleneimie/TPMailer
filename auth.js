var userModel = require('./models/userModel.js');
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      
            // handle token here
      
        } catch (err) {
          return next();
        }
    } else {
    next();
    }
};