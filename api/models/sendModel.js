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