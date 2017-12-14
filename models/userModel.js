'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');

// Classe User
class UserModel {
    constructor(id, email, password) {
        // Propriétés publiques
        this.id = id;
        this.email = email;
        this.password = password;
    }

    // Fonctions publiques

    // Fonction de récupération de toutes les campagnes
    getAllUser() {
        // On retourne une promise pour gérer les erreurs de la requête SQL dans le controller
        return new Promise(function(resolve, reject){
    
            let sql = `SELECT id, email, password
            FROM users`;
    
            connection.query(sql, function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                //on la resolve
                resolve(results);
            });
        });  
    };

    // Fonction de récupération d'une campagne
    getByEmailUser() {
        
        let user = this;
    
        return new Promise(function(resolve, reject){
            
            let sql = `SELECT id, email, password
            FROM users
            WHERE email = ?`;

            // Le point d'interrogation passé en paramètre est remplacé par le tableau, passé en paramètre de la fonction query
            connection.query(sql,[user.email], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
        
                user.id = results[0].id;
                user.password = results[0].password;
                
                //on la resolve
                resolve(user);
            });
        }); 
    };
}

module.exports = UserModel;