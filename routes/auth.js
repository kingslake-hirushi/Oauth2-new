var express = require("express");
var oauth = require("../modules/oauth");
const OAuth2Server = require("oauth2-server");

var Request = OAuth2Server.Request;
var Response = OAuth2Server.Response;

async function obtainToken(req, res) {
  console.log("obtainToken(req,res)");

  var request = new Request(req);
  var response = new Response(res);

  try {
    const token = await oauth.token(request, response);
    if (request.body.grant_type === "password") {
      console.log("grant type: password");
    } else if (request.body.grant_type === "refresh_token") {
      console.log("grant type: refresh_token");
    } else if (request.body.grant_type === "client_credentials") {
      //to do: not implemented yet
      console.log("grant type: client_credentials");
    } else {
      console.log("Unsupported grant type");
    }
    res.json(token);
  } catch (err) {
    res.status(err.code || 500).json(err);
  }
}

async function authenticateRequest(req, res, next) {
  console.log("authenticateRequest(req,res,next)");

  var request = new Request(req);
  var response = new Response(res);

  try {
    const token = await oauth.authenticate(request, response);
    next();
  } catch (err) {
    res.status(err.code || 500).json(err);
  }
}

var router = express.Router();

router.all("/token", obtainToken);
router.get("/", authenticateRequest, function (req, res, next) {
  res.send("Congratulations, you are in a secret area!");
});

module.exports = router;
