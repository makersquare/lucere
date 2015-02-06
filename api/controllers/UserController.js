/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var githubStateService = require("../services/githubStateService.js")();
var authService = require("../services/authService.js")();


module.exports = {
  login: function(req, res) {
    res.locals.flash = {err: req.flash("errorMessage")};
    res.view();
    res.locals.flash = {};
  },

  // route initiates github authentication process
  auth: function(req, res) {
    // If not logged in, redirect to github
    // "state" param created and included for security
    if(!req.session.authenticated) {
      var state = githubStateService.generateState();
      authService.redirectToGitHub(req, res, state);
    }
  },

  // github callback url
  // check state to ensure that requests to this route are in response to lucere requests
  authorize: function(req, res) {
    var accessCode = req.query.code;
    if(githubStateService.checkState(req, res)) {
      authService.authenticate(req, res, accessCode);
    } else {
      req.session.authenticated = false;
      return res.forbidden("You are not permitted to perform this action.");
    }
  },

  // ends session
  logout: function(req, res) {
    req.session.authenticated = false;
    delete req.session.currentUser;
    res.redirect("/");
  },

  // gets user from user table according to github username
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

  // route redirects requests (not page) to "read" auto-created CRUD route of current user
  currentuser: function(req, res) {
    if(req.session.authenticated && req.session.currentUser) {
      res.redirect("/user/" + req.session.currentUser.id);
    } else {
      res.json(null);
    }
  }
};

