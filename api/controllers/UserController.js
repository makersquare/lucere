/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var crypto = require("crypto");
var https = require("https");

var clientID = "client_id=" + process.env.CLIENT_ID;
var clientSecret = "&client_secret=" + process.env.CLIENT_SECRET;
var url = "https://github.com/login/oauth/authorize?";
var state;

var getRandomString = function() {
  var currentDate = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var hashed = crypto.createHash("sha1").update(currentDate + random).digest("hex");
  return hashed;
};

// Makes post request to github to get accessToken
// Calls checkUsers
var authenticate = function(req, res, accessCode) {
  var postOptions = {
    host: "github.com",
    path: "/login/oauth/access_token",
    method: "POST",
    headers: {
      "accept": "application/json"
    }
  };

  var request = https.request(postOptions, function(response) {
    response.setEncoding("utf8");
    var data = "";
    response.on("data", function(chunk) {
      data += chunk;
    });
    response.on("end", function() {
      var accessToken = JSON.parse(data).access_token;
      checkUsers(req, res, accessToken);
    });
  });

  request.write(clientID + clientSecret + "&code=" + accessCode);
  request.end();
};

// Makes get request to github to get user information
// Sets req.session.authenticate
var checkUsers = function(req, res, token) {
  var getOptions = {
    host: "api.github.com",
    path: "/user?access_token=" + token,
    method: "GET",
    headers: {
      "user-agent": "lucere"
    }
  };

  var request2 = https.request(getOptions, function(answer) {
    var userInfo = "";
    answer.on("data", function(chunk) {
      userInfo += chunk;
    });
    answer.on("end", function() {
      var ghUserName = JSON.parse(userInfo).login;

      // Compares github name to user table to see if user is allowed access
      var userQuery = User.find().where({github: ghUserName}).populateAll();
      userQuery.exec(function(err, data) {
        if(data.length == 1) {
          req.session.authenticated = true;
          req.session.currentUser = data[0];

          // redirect user to library of the first of their teams if they have a team
          if(req.session.currentUser.teams[0] && req.session.currentUser.teams[0].library) {
            res.redirect("/#/library/" + req.session.currentUser.teams[0].library);
          } else {
            res.redirect("/#/user/" + req.session.currentUser.id);
          }
        } else {
          req.session.authenticated = false;
          req.flash("errorMessage", ghUserName + " is not a user.");
          res.redirect("/#/error");
        }
      });

    });
  });
  request2.end();
};

module.exports = {
  login: function(req, res) {
    res.locals.flash = {err: req.flash("errorMessage")};
    res.view();
    res.locals.flash = {};
  },

  auth: function(req, res) {
    if(req.session.authenticated) {
      res.send("Already logged in");
    }

    state = getRandomString();
    res.redirect(url + clientID + "&state=" + state);
  },

  authorize: function(req, res) {
    var accessCode = req.query.code;
    var returnState = req.query.state;

    if(returnState === state) {
      authenticate(req, res, accessCode);
    } else {
      req.session.authenticated = false;
      return res.forbidden("You are not permitted to perform this action.");
    }
  },

  logout: function(req, res) {
    req.session.authenticated = false;
    delete req.session.currentUser;
    res.redirect("/");
  },

  github: function(req, res) {
    User.findOne()
      .where({github: req.param("github")})
      .populateAll()
      .exec(function(err, user) {
        if(!err && user) {
          res.send(user);
        } else {
          res.status(500).send(err);
        }
      });
  },

  currentuser: function(req, res) {
    if(req.session.authenticated && req.session.currentUser) {
      res.redirect("/user/" + req.session.currentUser.id);
    } else {
      res.json(null);
    }

  }
};

