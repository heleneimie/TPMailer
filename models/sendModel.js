'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');

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

    createSend() {
        let send = this;

        /* Récupère tous les contacts */
        let contactPromise = new Promise(function (resolve, reject) {

            let sql = `SELECT id, email FROM contacts`;

            connection.query(sql, function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }

                /* Renvoie un tableau de contacts */
                let contacts = results;


                /* Récupère les statuts d'envoi 'en attente' */
                let statusPromise = new Promise(function (resolve, reject) {

                    let sql = `SELECT id, name FROM statuses WHERE name LIKE '%en attente%'`;

                    connection.query(sql, function (error, results) {
                        if (error) {
                            //on rejette la promise
                            reject(error);
                        }

                        /* Renvoie les envois dont le statut est en attente */
                        let status = results;

                        let sends = [];
                        let errors = [];


                        return new Promise(function (resolve, reject) {

                            contacts.forEach(function (contact) {

                                let sql =   `INSERT INTO sends
                                            (idCampaign, idContact, idStatus)
                                            VALUES ( ?, ?, ?)`;
                                connection.query(sql, [send.idCampaign, contact.id, status.id], function (error, results) {
                                    if (error) {
                                        errors.push(error);
                                    }

                                    send.idContact = contact.id;
                                    send.idStatus = status.id;

                                    sends.push(send);
                                });


                            });

                            if(errors.length > 0) {
                                reject(errors);
                            }

                            resolve(sends);

                        });
                    });
                });
            });


        });

    }
}

module.exports = SendModel;