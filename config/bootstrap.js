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
  var usersData = [
    {
      name: "Mazdak Momen",
      email: "mazdak@wtf.comx",
      github: "mmomen",
      twitter: "@mexicanhatdance",
      teams: [],
      administrating: []
    },
    {
      name: "Chris Rhoton",
      email: "chris@wtf.comx",
      github: "chrisrhoton",
      twitter: "@alldayeveryday",
      teams: [],
      administrating: []
    },
    {
      name: "Tessa Kelly",
      email: "tessa@wtf.comx",
      github: "tesk9",
      twitter: "@iReadTheEntireDictionaryTwice",
      teams: [],
      administrating: []
    },
    {
      name: "Anastasi Bakolias",
      email: "stasi@wtf.comx",
      github: "spasiu",
      twitter: "@peakinggreek",
      teams: [],
      administrating: []
    },
    {
      name: "Sean Gibat",
      email: "sean@wtf.comx",
      github: "seangibat",
      twitter: "@prettyginger",
      teams: [],
      administrating: [],    
    },
    {
      name: "Krish Rajagopalan",
      email: "krish@wtf.comx",
      github: "krish-andres",
      twitter: "@lookatmyawesomebody",
      teams: [],
      administrating: [],    
    },
    {
      name: "Connor Kojimoto",
      email: "connor@wtf.comx",
      github: "conroyce",
      twitter: "@silentanddeadly",
      teams: [],
      administrating: [],    
    },
    {
      name: "Tae Yoon",
      email: "tae@wtf.comx",
      github: "xoddong",
      twitter: "@sailsangularbootstrapfoundationh8r",
      teams: [],
      administrating: [],    
    },
    {
      name: "Kenny Czadzeck",
      email: "kenny@wtf.comx",
      github: "kennyczadzeck",
      twitter: "@kennyspenny",
      teams: [],
      administrating: [],    
    },
    {
      name: "Jeff Louie",
      email: "jeff@wtf.comx",
      github: "jplouie",
      twitter: "@toomuchmuscle",
      teams: [],
      administrating: [],
    },
    {
      name: "Daniel Olasky",
      email: "daniel@wtf.comx",
      github: "delasky",
      twitter: "@catman",
      teams: [],
      administrating: [],
    },
    {
      name: "Pipe Guiterrez",
      email: "pipe@wtf.comx",
      github: "Dudemullet",
      twitter: "@pipedream",
      teams: [],
      administrating: [],
    },
    {
      name: "Shehzan Devani",
      email: "shehzan@makersquare.com",
      github: "sdevani",
      twitter: "@powerpuffgirlfan",
      teams: [],
      administrating: [],
    }
  ];

  var librariesData = [
    {
      name: "library1",
    },
    {
      name: "library2",
    }
  ];

  var modulesData = [
    {
      name: "module1",
      lessons: []
    },
    {
      name: "module2",
      lessons: []
    },
    {
      name: "module3",
      lessons: []
    }
  ];

  var lessonsData = [
    {
      title: "lesson1",
      body: "#Don't be a dick"
    },
    {
      title: "lesson2",
      body: "Brush your teeth **three** _times_ a day"
    },
    {
      title: "lesson3",
      body: "Don't trust anyone"
    },
    {
      title: "lesson4",
      body: "snoop d o double g"
    }
  ];

  var teamsData = [
    {
      name: "Core",
      users: [],
      admins: []
    },
    {
      name: "Team 2",
      users: [],
      admins: []
    }
  ];

  User.create(usersData).then(function(users) {
    return [
      users,
      Team.create(teamsData),
      Library.create(librariesData),
      Module.create(modulesData),
      Lesson.create(lessonsData)
    ]
  })
  .spread(function(users, teams, libraries, modules, lessons) {

    Team.update({id: teams[0].id}, {library: libraries[0].id}).exec(function(err, coreTeam){
      coreTeam[0].users.add(users[0].id);
      coreTeam[0].users.add(users[1].id);
      coreTeam[0].users.add(users[2].id);
      coreTeam[0].users.add(users[3].id);
      coreTeam[0].users.add(users[4].id);
      coreTeam[0].users.add(users[5].id);
      coreTeam[0].users.add(users[6].id);

      coreTeam[0].admins.add(users[0].id);
      coreTeam[0].admins.add(users[1].id);
      coreTeam[0].admins.add(users[2].id);
      coreTeam[0].admins.add(users[3].id);
      coreTeam[0].admins.add(users[4].id);
      coreTeam[0].admins.add(users[5].id);
      coreTeam[0].admins.add(users[6].id);
      coreTeam[0].admins.add(users[7].id);
      coreTeam[0].admins.add(users[8].id);
      coreTeam[0].admins.add(users[9].id);
      coreTeam[0].admins.add(users[10].id);
      coreTeam[0].admins.add(users[11].id);
      coreTeam[0].admins.add(users[12].id);
      
      coreTeam[0].save().then(function(updatedCoreTeam, err) {
        Library.update({id: libraries[0].id}, {team: coreTeam[0].id}).exec(function(err, coreLibrary){
          coreLibrary[0].modules.add(modules[0].id);
          coreLibrary[0].modules.add(modules[1].id);
          coreLibrary[0].save().then(function(updatedCoreLibrary, err) {
            // Seems to only work if you set the module on the lesson
            // rather than the lesson on the module.
            lessons[0].module = updatedCoreLibrary.modules[0].id;
            lessons[0].save();
            lessons[1].module = updatedCoreLibrary.modules[0].id;
            lessons[1].save();
            lessons[2].module = updatedCoreLibrary.modules[1].id;
            lessons[2].save();
          });
        });
      });
    });

    Team.update({id: teams[1].id}, {library: libraries[1].id}).exec(function(err, regularCohort) {
      regularCohort[0].users.add(users[7].id);
      regularCohort[0].users.add(users[8].id);
      regularCohort[0].users.add(users[9].id);
      regularCohort[0].users.add(users[10].id);
      regularCohort[0].users.add(users[11].id);
      regularCohort[0].users.add(users[12].id);
      regularCohort[0].save().then(function(team, err) {
        Library.update({id: libraries[1].id}, {team: teams[1].id}).exec(function(err, cohortLibrary){
          cohortLibrary[0].modules.add(modules[2].id);
          cohortLibrary[0].save().then(function(updatedCohortLibrary, err) {
            // Seems to only work if you set the module on the lesson
            // rather than the lesson on the module.
            lessons[3].module = updatedCohortLibrary.modules[0].id;
            lessons[3].save();
          });
        });
      });
    });

    cb();
  });

};