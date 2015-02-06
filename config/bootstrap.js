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
      team: 1
    },
    {
      name: "library2",
      team: 2
    }
  ];

  var modulesData = [
    {
      name: "module1"
    },
    {
      name: "module2"
    },
    {
      name: "module3"
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
      library: [],
      admins: []
    },
    {
      name: "Team 2",
      users: [],
      library: [],
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
    // Add modules to libraries
    libraries[0].modules.add(modules[0].id);
    libraries[0].modules.add(modules[1].id);
    libraries[0].save();

    libraries[1].modules.add(modules[2].id);
    libraries[1].save();

    // Add Lessons to modules
    modules[0].lessons.add(lessons[0].id);
    modules[0].lessons.add(lessons[1].id);
    modules[0].save();

    modules[1].lessons.add(lessons[2].id);
    modules[1].save();

    modules[2].lessons.add(lessons[3].id);
    modules[2].save();

    // Add users to teams
    teams[0].users.add(users[0].id);
    teams[0].users.add(users[1].id);
    teams[0].users.add(users[2].id);
    teams[0].users.add(users[3].id);
    teams[0].users.add(users[4].id);
    teams[0].users.add(users[5].id);
    teams[0].users.add(users[6].id);

    teams[1].users.add(users[7].id);
    teams[1].users.add(users[8].id);
    teams[1].users.add(users[9].id);
    teams[1].users.add(users[10].id);
    teams[1].users.add(users[11].id);
    teams[1].users.add(users[12].id);

    // Make users admins
    users[0].administrating.add(teams[0].id);
    users[1].administrating.add(teams[0].id);
    users[2].administrating.add(teams[0].id);
    users[3].administrating.add(teams[0].id);
    users[4].administrating.add(teams[0].id);
    users[5].administrating.add(teams[0].id);
    users[6].administrating.add(teams[0].id);
    users[7].administrating.add(teams[0].id);
    users[8].administrating.add(teams[0].id);
    users[9].administrating.add(teams[0].id);
    users[10].administrating.add(teams[0].id);
    users[11].administrating.add(teams[0].id);
    users[12].administrating.add(teams[0].id);

    // Remember the callback
    cb();
  });

  // User.create(users).exec(function(err, user){
  //   Library.create(libraries).exec(function(err, lib) {
  //     Module.create(modules).exec(function(err, modules) {
  //       lib[0].modules.add(modules[0].id);
  //       lib[0].modules.add(modules[1].id);
  //       lib[0].save();

  //       lib[1].modules.add(modules[2].id);
  //       lib[1].save();
  //       Lesson.create(lessons).exec(function(err, lessons) {
  //         modules[0].lessons.add(lessons[0].id);
  //         modules[0].lessons.add(lessons[1].id);
  //         modules[0].save();

  //         modules[1].lessons.add(lessons[2].id);
  //         modules[1].save();

  //         modules[2].lessons.add(lessons[3].id);
  //         modules[2].save();
  //         Team.create(teams).exec(function(err, team) {
  //           team[0].users.add(user[0].id);
  //           cb();
  //         });
  //       });
  //     });
  //   });
  // });
};