'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');

// Classe Campaign
class StatusModel {

    constructor(id, name) {
        // Propriétés publiques
        this.id = id;
        this.name = name;
    }

    // Fonction publique

    //Fonction de récupération du statut en fonction du nom

    getByNameStatus() {

        let status = this;
        
        return new Promise(function(resolve, reject){
            
            let sql = `SELECT id, name FROM statuses WHERE name = ?`;

            // Le point d'interrogation passé en paramètre est remplacé par le tableau, passé en paramètre de la fonction query
            connection.query(sql, [status.name], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                console.log("result", results[0]);
                //on la resolve
                resolve(results[0]);
            });
        }); 
    }

}

module.exports = StatusModel;