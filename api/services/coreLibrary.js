module.exports = {

  // Spread explanation:
  // We can set a query to a variable but not execute (.exec());
  // Instead, use .then and inside the callback of .then, return multiple queries in an array
  // use .spread and parameters will align with the queries that are in the array
  // i.e. return[Library.Find, Modules.Find, Lessons.Find] => .spread(function(foundLibrary, foundModules, foundLessons){ ... })
  // the parameters returns the return value of the each query in an array.

    // var userQuery = User.find();
    // userQuery.then(function(user){
    //   ...
    //   return [Library.Find, Module.Find]
    // }).spread(function(foundLibrary, foundModules, foundLessons){
    //   ...
    // })

  clone: function(team, callback) {
    var cloneLesson = function(moduleId, coreLesson) {
      var newLesson = Lesson.create({
        title: coreLesson.title,
        body: coreLesson.body,
        module: moduleId
      });

      return newLesson.then();
    };

    var cloneModule = function(libraryId, coreModule, callback) {
      Module.create({
        name: coreModule.name,
        library: libraryId
      })
      .then(function(newModule) {
        nModule = newModule;
        return coreModule.lessons.map(function(coreLesson) {
          cloneLesson(newModule.id, coreLesson);
        });
      })
      .spread(function() {
        var newModule = nModule;
        var asyncResults = Array.prototype.slice.call(arguments);
      });
    };
 
    // Core Library's id = 1
    var libraryName = team.name + " - Library";
    var coreLibPromise = Library.findOne({id: 1}).populate("modules");
    var newLibPromise = Library.create({name: libraryName, team: team.id});

    coreLibPromise.then(function(clib) {
      // Populate modules with lessons
      var modules = clib.modules.map(function(module) {
        return Module.findOne({id: module.id}).populate("lessons");
      });   

      return [clib, newLibPromise].concat(modules);
    })
    .spread(function(clib, nlib) {
      // Arugments are: core library, new library, and all the modules associated with core library. 
      // Array.prototype.slice.call will only return the values of the arguments;
      var modules = Array.prototype.slice.call(arguments);
      var modules = modules.slice(2, modules.length);
      // Create a new set of modules from existing modules associated with the library:
      var newModules = modules.map(function(module) {
        return cloneModule(nlib.id, module, function(newModule) {
        });
      });
      newModules.unshift(nlib);
      return newModules;
    })
    .spread(function() {
      newModules = Array.prototype.slice.call(arguments);
      newLibrary = newModules.shift();
      callback(newLibrary);
    });
  }
};