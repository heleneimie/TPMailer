'use strict';
// Import du model pour les intéractions avec la base de données
var Send = require('./../models/sendModel.js');

const sendController = {
    createSend: function(req, res){

        var send = new Send(req.body.idCampaign, '', '');

        var sendPromise = send.sendSend();

        console.log("send", send);

        sendPromise
        .then(function(results){
            console.log("results", results);
            res.json(results);
        })
        .catch(function(reason){
            console.log("reason", reason);
            res.send(reason);
        })

    }
}

module.exports = sendController;