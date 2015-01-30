/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  var users = [
    {
      name: "Mazdak Momen",
      email: "mazdak@wtf.comx",
      github: "mmomen",
      twitter: "@mexicanhatdance",
      teams: [],
      administrating: [],
      id: 1
    },
    {
      name: "Chris Rhoton",
      email: "chris@wtf.comx",
      github: "chrisrhoton",
      twitter: "@alldayeveryday",
      teams: [],
      administrating: [],
      id: 2
    },
    {
      name: "Tessa Kelly",
      email: "tessa@wtf.comx",
      github: "tesk9",
      twitter: "@iReadTheEntireDictionaryTwice",
      teams: [],
      administrating: [],
      id: 3
    },
    {
      name: "Anastasi Bakolias",
      email: "stasi@wtf.comx",
      github: "spasiu",
      twitter: "@peakinggreek",
      teams: [],
      administrating: [],
      id: 4
    },
    {
      name: "Sean Gibat",
      email: "sean@wtf.comx",
      github: "seangibat",
      twitter: "@prettyginger",
      teams: [],
      administrating: [],
      id: 5
    },
    {
      name: "Krish Rajagopalan",
      email: "krish@wtf.comx",
      github: "krish-andres",
      twitter: "@lookatmyawesomebody",
      teams: [],
      administrating: [],
      id: 6
    },
    {
      name: "Connor Kojimoto",
      email: "connor@wtf.comx",
      github: "conroyce",
      twitter: "@silentanddeadly",
      teams: [],
      administrating: [],
      id: 7
    },
    {
      name: "Tae Yoon",
      email: "tae@wtf.comx",
      github: "xoddong",
      twitter: "@sailsangularbootstrapfoundationh8r",
      teams: [],
      administrating: [],
      id: 8
    },
    {
      name: "Kenny Czadzeck",
      email: "kenny@wtf.comx",
      github: "kennyczadzeck",
      twitter: "@kennyspenny",
      teams: [],
      administrating: [],
      id: 9
    },
    {
      name: "Jeff Louie",
      email: "jeff@wtf.comx",
      github: "jplouie",
      twitter: "@toomuchmuscle",
      teams: [],
      administrating: [],
      id: 10
    },
    {
      name: "Daniel Olasky",
      email: "daniel@wtf.comx",
      github: "delasky",
      twitter: "@catman",
      teams: [],
      administrating: [],
      id: 11
    },
    {
      name: "Pipe Guiterrez",
      email: "pipe@wtf.comx",
      github: "Dudemullet",
      twitter: "@pipedream",
      teams: [],
      administrating: [],
      id: 12
    }
  ];


  User.create(users)
    .exec(cb);
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  // cb();
};
