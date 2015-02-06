/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Core = require("../services/coreLibrary.js");

module.exports = {
  create: function(req, res) {
    var team = req.params.all();

    Team.create(team).then(function(newTeam) {
      Core.clone(newTeam, function(lib) {
        res.send({"teamId": newTeam.id});
      });
    });
  }
};