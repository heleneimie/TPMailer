//Require dependencies
const express = require("express");
var bodyParser = require('body-parser');
//var cors = require('cors');
//var auth = require('./api/auth.js'); //Authentification by Token

//Init app
const app = express();

//Enable json request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');


// Configuring CORS w/ Dynamic Origin
var whitelist = ['http://localhost:3000', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Crée un serveur en lui passant notre application express
const http = require('http').Server(app);

//Routing
var routes = require('./routes.js'); //importing route
routes(app); //register the route

//Declare port used
if (module.parent === null) {
    http.listen(3000, function(){
        console.log("Express écoute à http://localhost:%d", http.address().port);
    });
}




