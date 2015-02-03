module.exports = {

  clone: function(libraryName, callback) {

    var cloneLesson = function(coreLesson, callback) {
      Lesson.create({
        title: coreLesson.title,
        body: coreLesson.body,
        module: coreLesson.module
      }).exec(function(err, newLesson){
        callback(newLesson);
      });
    };

    var cloneModule = function(coreModule, callback) {
      var newMod;
      Module.create({
        name: coreModule.name,
        library: coreModule.library
      })
      .then(function(newModule){
        newMod = newModule;
        return coreModule.lessons.map(function(lesson){
          return cloneLesson(lesson, function(newLesson){
            newMod.lessons.push(newLesson);
          });
        });
      })
      .spread(function(asyncCalls){
        callback(newMod);
      });
    };

    var coreLib, newLib;
    var coreLibPromise = Library.findOne({isCore: true}).populate("modules");
    var newLibPromise = Library.create({name: libraryName});

    coreLibPromise.then(function(clib){
       return [clib, newLibPromise];
    })

    .then(function(clib, nlib){
      coreLib = clib;
      newLib = nlib;
      return coreLib.modules.map(function(module){
        return cloneModule(module, function(newModule){
          newLib.modules.push(newModule);
        });
      });
    })

    .spread(function(asyncCalls){
      callback(newLib);
    });
  }
};