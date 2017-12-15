'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');

// Classe Campaign
class ContactModel {

    constructor(id, email) {
        // Propriétés publiques
        this.id = id;
        this.email = email;
    }

    // Fonction publique

    //Fonction de récupération du statut 'en attente'

    getAllContact() {
        
        return new Promise(function(resolve, reject){
            
            let sql = `SELECT id, email FROM contacts`;
    
            connection.query(sql, function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                //on la resolve
                resolve(results);
            });
        }); 
    }
    
}

module.exports = ContactModel;