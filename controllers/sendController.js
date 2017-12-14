
'use strict';
// Import du model pour les intéractions avec la base de données
var Send = require('./../models/sendModel.js');


const sendController = {
    createSend: function(req, res){

        let send = new Send(req.body.idCampaign, '', '');

        var sendPromise = send.createSend();

        sendPromise
            .then(function(results){
                res.json(results);
            })
            .catch(function(reason){
                res.send(reason);
            })
    }
}

module.exports = sendController;