'use strict';
module.exports = function(app) {
    var campaign = require('./controllers/campaignController');
    var user = require('./controllers/userController');
    var send = require('./controllers/sendController');
    var auth = require('./controllers/authController');

    const versionApi = '/api/v1';

    // Campaigns
    app.route(`${versionApi}/campaigns`)
        .get([auth.verifyAuth],campaign.getAllCampaign)
        .put(campaign.updateCampaign)
        .post(campaign.createCampaign);

    app.route(`${versionApi}/campaigns/:campaignId`)
        .get(campaign.getByIdCampaign)
        .delete(campaign.deleteCampaign);

    //Sends
    app.route(`${versionApi}/sends`)
        .post(send.createSend);

    // User
    app.route(`${versionApi}/users`)
        .get(user.getAllUser);

    app.route(`${versionApi}/users/:userEmail`)
        .get(user.getByEmailUser);

    // Auth
    app.route(`${versionApi}/auth`)
        .post(auth.createAuth);

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message
            }
        });
    });
};