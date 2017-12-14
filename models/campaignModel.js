'use strict';
//pour sauvegarder les messages en bdd
const connection = require('./../database/db.js');

// Classe Campaign
class CampaignModel {
    constructor(id, name, subject, content, dateSend) {
        // Propriétés publiques
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.content = content;
        this.dateSend = dateSend;
    }

    // Fonctions publiques

    // Fonction de récupération de toutes les campagnes
    getAllCampaign() {
        // On retourne une promise pour gérer les erreurs de la requête SQL dans le controller
        return new Promise(function(resolve, reject){
    
            let sql = `SELECT id, name, subject, content, dateSend
            FROM campaigns`;
    
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
    getByIdCampaign() {
        
        let campaign = this;
    
        return new Promise(function(resolve, reject){
            
            let sql = `SELECT id, name, subject, content, dateSend
            FROM campaigns
            WHERE id = ?`;

            // Le point d'interrogation passé en paramètre est remplacé par le tableau, passé en paramètre de la fonction query
            connection.query(sql,[campaign.id], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
        
                campaign.name = results[0].name;
                campaign.subject = results[0].subject;
                campaign.content = results[0].content;
                campaign.dateSend = results[0].dateSend;
                
                //on la resolve
                resolve(campaign);
            });
        }); 
    };

    // Fonction de création d'une campagne
    createCampaign() {
        
        let campaign = this;
    
        return new Promise(function(resolve, reject){
    
            let sql = `INSERT INTO campaigns
            (name, subject, content, dateSend)
            VALUES ( ?, ?, ?, ?)`;
    
            connection.query(sql,[campaign.name, campaign.subject, campaign.content, campaign.dateSend], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                campaign.id = results.insertId;
                //on la resolve
                resolve(campaign);
            });
        });   
    };

    // Fonction de mise à jour d'une campagne
    updateCampaign() {
        
        let campaign = this;
    
        return new Promise(function(resolve, reject){
    
            let sql = `UPDATE campaigns
            SET name = ?, 
            subject = ?,
            content = ?,
            dateSend = ?
            WHERE id = ?`;
    
            connection.query(sql,[campaign.name, campaign.subject, campaign.content, campaign.dateSend, campaign.id], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                //on la resolve
                resolve(campaign);
            });
        });   
    };
    
    // Fonction de suppression d'une campagne
    deleteCampaign() {
        
        let campaign = this;
    
        return new Promise(function(resolve, reject){
    
            let sql = `DELETE FROM campaigns
            WHERE id = ?`;
    
            connection.query(sql,[campaign.id], function (error, results) {
                if (error) {
                    //on rejette la promise
                    reject(error);
                }
                //on la resolve
                resolve(campaign);
            });
        });   
    };
}

module.exports = CampaignModel

