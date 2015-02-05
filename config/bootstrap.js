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
    },
    {
      name: "Shehzan Devani",
      email: "shehzan@makersquare.com",
      github: "sdevani",
      twitter: "@powerpuffgirlfan",
      teams: [],
      administrating: [],
      id: 13
    }
  ];

  var libraries = [
    {
      id: 1,
      name: "library1",
      team: 1
    },
    {
      id: 2,
      name: "library2",
      team: 2
    }
  ];

  var modules = [
    {
      id: 1,
      name: "module1"
    },
    {
      id: 2,
      name: "module2"
    }
  ];

  var lessons = [
    {
      id: 1,
      title: "lesson1",
      body: "#Don't be a dick"
    },
    {
      id: 2,
      title: "lesson2",
      body: "Brush your teeth **three** _times_ a day"
    },
    {
      id: 3,
      title: "lesson3",
      body: "Don't trust anyone"
    }
  ];

  var teams = [
    {
      id: 1,
      name: "Core",
      users: [1,2,3,7,8,9],
      library: [1],
      admins: [1,2,3,7,8,9]
    },
    {
      id: 2,
      name: "Team 2",
      users: [4,5,6,10,11,12,13],
      library: [2],
      admins: [4,5,6,10,11,12,13]
    }
  ];

  User.create(users).exec(function(err, user){
    Library.create(libraries).exec(function(err, lib) {
      Module.create(modules).exec(function(err, modules) {
        lib[0].modules.add(1);
        lib[0].modules.add(2);
        lib[0].save();

        lib[1].modules.add(1);
        lib[1].save();
        Lesson.create(lessons).exec(function(err, lessons) {
          modules[0].lessons.add(1);
          modules[0].lessons.add(2);
          modules[0].save();

          modules[1].lessons.add(3);
          modules[1].save();
          Team.create(teams).exec(function(err, team) {
            cb();
          });
        });
      });
    });
  });
};