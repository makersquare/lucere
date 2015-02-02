module.exports = {
  init: function(name, cb) {

    Library.findOne({
      isCore: true
    }).populateAll().exec(function(err, coreLibrary) {

      Library.create({
        name: name
      }).exec(function(err, newLibrary) {
        cb(newLibrary); //execute callback on newLibrary and continue to populate it
        coreLibrary.modules.forEach(function(coreModule) {
          Module.create({
            name: coreModule.name,
            library: newLibrary
          }).exec(function(err, newModule){
            newLibrary.modules.push(newModule);
            Module.findOne({
              id: coreModule.id
            }).populateAll().exec(function(err, populatedCoreModule) {

              populatedCoreModule.lessons.forEach(function(err, coreLesson) {
                Lesson.create({
                  title: coreLesson.title,
                  body: coreLesson.body,
                  module: newModule
                }).exec(function(err, newLesson) {
                  newModule.lessons.push(newLesson);
                });
              });
            });
          });
        });
      });
    });
  }
};
