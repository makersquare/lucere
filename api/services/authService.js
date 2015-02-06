module.exports = function() {   
  var https = require("https");

  var clientID = "client_id=" + process.env.CLIENT_ID;
  var clientSecret = "&client_secret=" + process.env.CLIENT_SECRET;
  var url = "https://github.com/login/oauth/authorize?";

  var redirectToGitHub = function(req, res, state) {
    res.redirect(url + clientID + "&state=" + state);
  };

  // Makes post request to github to get accessToken
  // Calls retrieveGitHubUserInfo
  var authenticate = function(req, res, accessCode) {
    var postOptions = {
      host: "github.com",
      path: "/login/oauth/access_token",
      method: "POST",
      headers: {
        "accept": "application/json"
      }
    };

    var request = requestHandler(postOptions, function(parsedData) {
      var accessToken = parsedData.access_token;
      retrieveGitHubUserInfo(req, res, accessToken);
    });

    request.write(clientID + clientSecret + "&code=" + accessCode);
    request.end();
  };

  // Makes get request to github to get user information
  var retrieveGitHubUserInfo = function(req, res, token) {
    var getOptions = {
      host: "api.github.com",
      path: "/user?access_token=" + token,
      method: "GET",
      headers: {
        "user-agent": "lucere"
      }
    };

    var request = requestHandler(getOptions, function(parsedData) {
      var ghUserName = parsedData.login;
      findUser(req, res, ghUserName);
    });

    request.end();
  };

  var requestHandler = function(options, cb) {
    var request = https.request(options, function(answer) {
      var data = "";
      answer.on("data", function(chunk) {
        data += chunk;
      });
      answer.on("end", function() {
        var parsedData = JSON.parse(data);
        cb(parsedData);
      });
    });
    return request;
  };

  // Compares github name to user table to see if user is allowed access
  var findUser = function(req, res, ghUserName) {
    var userQuery = User.findOne().where({github: ghUserName}).populateAll();
    userQuery.exec(function(err, user) {
      if(err || !user) {
        loginFail(req, res, ghUserName);
      } else {
        loginUser(req, res, user);
      }
    });
  };

  var loginFail = function(req, res, ghUserName) {
    req.session.authenticated = false;
    req.flash("errorMessage", ghUserName + " is not a user.");
    res.redirect("/#/error");
  };

  var loginUser = function(req, res, user) {
    req.session.authenticated = true;
    req.session.currentUser = user;

    // redirect user to library of the first of their teams if they have a team
    if(req.session.currentUser.teams[0] && req.session.currentUser.teams[0].library) {
      res.redirect("/#/library/" + req.session.currentUser.teams[0].library);
    } else {
      res.redirect("/#/user/" + req.session.currentUser.id);
    }
  };

  return {
    redirectToGitHub: redirectToGitHub,
    authenticate: authenticate
  };
};