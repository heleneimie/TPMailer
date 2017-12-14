// Import du model pour les intéractions avec la base de données
var Campaign = require('./../models/campaignModel.js');


const campaignController = {
    // Demande au model de recupérer toutes les campagnes
    getAllCampaign: function(req, res){

        // Instancie une campagne pour avoir à disposition les fonctions de la classe
        var campaign = new Campaign('', '', '', '', '');

        // On utilise la fonction getAllCampaign() pour récupérer toutes les campagnes
        campaignPromise = campaign.getAllCampaign(); 

        // On utilise les promises (retournés par la fonction) pour générer les cas d'erreur
        campaignPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    },
    // Demande au model de recupérer une campagne avec un ID passer en paramètre
    getByIdCampaign: function(req, res){

        // On recupère l'id passé en paramètre : /campaigns/:campaignId
        let campaignId = req.params.campaignId;

        // Instancie une campagne pour avoir à disposition les fonctions de la classe
        var campaign = new Campaign(campaignId, '', '', '', '');

        // On utilise la fonction getByIdCampaign() pour récupérer une campagne
        campaignPromise = campaign.getByIdCampaign(); 

        // On utilise les promises (retournés par la fonction) pour générer les cas d'erreur
        campaignPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    },
    createCampaign: function(req, res){

        let campaign = new Campaign('', req.body.name, req.body.subject, req.body.content, req.body.dateSend);

        campaignPromise = campaign.createCampaign(); 

        campaignPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    },
    updateCampaign: function(req, res){

        let campaign = new Campaign(req.body.id, req.body.name, req.body.subject, req.body.content, req.body.dateSend);

        campaignPromise = campaign.updateCampaign(); 

        campaignPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    },
    deleteCampaign: function(req, res){
        
        let campaignId = req.params.campaignId;

        var campaign = new Campaign(campaignId, '', '', '', '');
    
        campaignPromise = campaign.deleteCampaign(); 
    
        campaignPromise
        .then(function(results){
            res.json(results);
        })
        .catch(function(reason){
            res.send(reason);
        })
    }
}

module.exports = campaignController;