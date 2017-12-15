'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');
const Contact = require('./contactModel.js');
const Status = require('./statusModel.js');

// Classe Campaign
class SendModel {

    constructor(idCampaign, idContact, idStatus) {
        // Propriétés publiques
        this.idCampaign = idCampaign;
        this.idContact = idContact;
        this.idStatus = idStatus;
    }

    // Fonction publique

    // Fonction de création d'un envoi de campagne

    getByIdSend() {

        let send = this;
        
        return new Promise(function(resolve, reject){
            
            let sql = `SELECT idCampaign, idContact, idStatus
            FROM sends
            WHERE idCampaign = ?`;

            // Le point d'interrogation passé en paramètre est remplacé par le tableau, passé en paramètre de la fonction query
            connection.query(sql,[send.idCampaign], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
        
                //on la resolve
                resolve(results);
            });
        }); 
        
    }

    sendSend() {

        let send = this;

        return new Promise(function (resolve, reject) {

            let existPromise = send.getByIdSend();

            existPromise
            .then(function(results){
                console.log("results", results);

                if (results.length == 0) {
                    
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
                            .then(function(results){
                                console.log("sendsResults", results);
                                resolve(results);
                            })
                            .catch(function(reason){
                                console.log("sendsReason" + reason);
                                reject(reason);
                            })
            
                        })
                        .catch(function(statusReason){
                            console.log("statusReason", statusReason);
                            resolve(statusReason);
                        })
            
                    })
                    .catch(function(contactsReason){
                        console.log("contactsReason", contactsReason);
                        reject(contactsReason);
                    })
                    
                } else {

                    let msg = "Campaign was send previously";
                    resolve(msg);

                }
            })
            .catch(function(reason){
                console.log("reason", reason);
                reject(reason);
            })



        });
        
    }

    createSend() {

        let send = this;

        return new Promise(function (resolve, reject) {

            let sql =   `INSERT INTO sends
                        (idCampaign, idContact, idStatus)
                        VALUES ( ?, ?, ?)`;
                        
            connection.query(sql, [send.idCampaign, send.idContact, send.idStatus], function (error, results) {
                if (error) {
                    reject(error);
                }

                resolve(send);

            });

        });
            
    }
}

module.exports = SendModel;