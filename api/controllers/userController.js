'use strict';
// Import du model pour les intéractions avec la base de données
var User = require('./../models/userModel.js');

const userController = {
    // Demande au model de recupérer toutes les campagnes
    getAllUser: function(req, res){

        var user = new User('', '', '');

        var userPromise = user.getAllUser(); 

        userPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    },
    getByEmailUser: function(req, res){

        let userEmail = req.params.userEmail;

        var user = new User('', userEmail, '');

        var userPromise = user.getByEmailUser(); 

        userPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    }
  
}

module.exports = userController;