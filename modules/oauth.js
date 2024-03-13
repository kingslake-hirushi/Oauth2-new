// modules/oauth.js
var oauthserver = require('oauth2-server');
var memorystore = require('./model.js');

var oauth = new oauthserver({
    model: memorystore,
    accessTokenLifetime: 120,
    refreshTokenLifetime: 240
});

module.exports = oauth;