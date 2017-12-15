// Import du model pour les intéractions avec la base de données
var User = require('./../models/userModel.js');
var jwt = require('jwt-simple');
var moment = require('moment');

const secret = 'ma-super-chaine-de-caractere-ultra-chrypte';


const authController = {
    createAuth: function(req, res) {

        let email = req.body.email;
        let password = req.body.password;

        let user = new User('', email, '');

        let userPromise = user.getByEmailUser();

        userPromise
        .then(function(results){

            if (results.length != 0) { //Si l'utilisateur a été trouvé

                if(results.password === password) {
                    
                    const token = jwt.encode({
                        email: user.email
                    }, secret);
                
                    res.json({token})

                } else {
                    console.log("incorrect password");
                    resolve("incorrect password"); //Dans l'idéal renvoyé le statut 401 avec un message de type 'User not found' avec un res.status(401).json(msg)
                }

            } else { //Si l'utilisateur a été trouvé
                console.log("user not found");
                resolve("User not found"); //Dans l'idéal renvoyé le statut 401 avec un message de type 'User not found' avec un res.status(401).json(msg)
            }
        })
        .catch(function(reason){
            res.send(reason);
        })

    },
    verifyAuth: function(req, res, next) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                var decoded = jwt.decode(token, secret);

                return next();
        
        
            } catch (err) {
                res.send(err);
            }
        } else {
            res.send("Token was not find into body of your http request or params or headers");
        }
    }

}

module.exports = authController;