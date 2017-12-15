'use strict';
// Import du model pour les intéractions avec la base de données
var Send = require('./../models/sendModel.js');
var Contact = require('./../models/contactModel.js');
var Status = require('./../models/statusModel.js');


const sendController = {
    createSend: function(req, res){

        let send = new Send(req.body.idCampaign, '', '');

        let contact = new Contact('','');

        let contactPromise = contact.getAllContact();
        
        contactPromise
        .then(function(contactsResults){

            console.log("contactsResults", contactsResults);

            let status = new Status('', 'en attente');

            let statusPromise = status.getByNameStatus();

            statusPromise
            .then(function(statusResults){

                console.log("statusResults", statusResults);

                send.idStatus = statusResults.id;

                var listSendPromise = [];
                var sendsResults = 

                contactsResults.forEach(contact => {

                    send.idContact = contact.id;

                    listSendPromise.push(send.createSend());

                });

                console.log("listSendPromise", listSendPromise);

                Promise.all(listSendPromise)
                .then(function(sendsResults){

                    console.log("sendsResults", sendsResults);
                    res.json(sendsResults);

                })
                .catch(function(sendsReason){

                    console.log("sendsReason" + sendsReason);
                    res.send(sendsReason);

                })
    
            })
            .catch(function(statusReason){
                console.log("statusReason", statusReason);
                res.send(statusReason);
            })

        })
        .catch(function(contactsReason){
            console.log("contactsReason", contactsReason);
            res.send(contactsReason);
        })

    }
}

module.exports = sendController;