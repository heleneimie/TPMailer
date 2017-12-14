'use strict';
module.exports = function(app) {
  var campaign = require('./controllers/campaignController');

  const versionApi = '/api/v1';

  // Campaigns
  app.route(`${versionApi}/campaigns`)
    .get(campaign.getAllCampaign)
    .put(campaign.updateCampaign)
    .post(campaign.createCampaign);

  app.route(`${versionApi}/campaigns/:campaignId`)
    .get(campaign.getByIdCampaign)
    .delete(campaign.deleteCampaign);

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