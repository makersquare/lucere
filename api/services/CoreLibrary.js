module.exports = {

  clone: function(libraryName, callback) {

    var cloneLesson = function(moduleId, coreLesson) {
      return Lesson.create({
        title: coreLesson.title,
        body: coreLesson.body,
        module: moduleId
      })
    };

    var cloneModule = function(libraryId, coreModule, callback) {
      Module.create({
        name: coreModule.name,
        library: libraryId
      })
      .then(function(newModule){
        nModule = newModule;
        return coreModule.lessons.map(function(coreLesson){
          cloneLesson(newModule.id, coreLesson);
        });
      })
      .spread(function(){
        var newModule = nModule;
        var asyncResults = Array.prototype.slice.call(arguments);
      });
    };

    var coreLibPromise = Library.findOne({isCore: true}).populate("modules");
    var newLibPromise = Library.create({name: libraryName});

    coreLibPromise.then(function(clib){
      // Populate modules with lessons
      var modules = clib.modules.map(function(module){
        return Module.findOne({id: module.id}).populate("lessons");
      })      

       return [clib, newLibPromise].concat(modules);
    })

    .spread(function(clib, nlib){
      var modules = Array.prototype.slice.call(arguments);
      var modules = modules.slice(2, modules.length);
      var newModules = modules.map(function(module){
        return cloneModule(nlib.id, module, function(newModule){
        });
      });
      newModules.unshift(nlib);
      return newModules;
    })

    .spread(function(){
      newModules = Array.prototype.slice.call(arguments);
      newLibrary = newModules.shift();
      callback(newLibrary);
    });
  }
};