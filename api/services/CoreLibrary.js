module.exports = {
  initialize: function(name, team, cb) {

    Library.findOne({
      isCore: true
    }).populateAll().exec(function(err, coreLibrary){

      Library.create({
        name: name,
        team: team
      }).exec(function(err, newLibrary){

        coreLibrary.modules.forEach(function(coreModule){
          Module.create({
            name: coreModule.name,
            library: newLibrary
          }).exec(function(err, newModule){

            Module.findOne({
              id: coreModule.id
            }).populateAll().exec(function(err, populatedCoreModule){

              populatedCoreModule.lessons.forEach(function(err, coreLesson){
                Lesson.create({
                  title: coreLesson.title,
                  body: coreLesson.body,
                  module: newModule
                }).exec(function(err, newLesson){
                  newModule.lessons.push(newLesson);
                });
              });
            });
          });
          newLibrary.modules.push(newModule);
        });
        cb(newLibrary);
      });
    });
  }
};