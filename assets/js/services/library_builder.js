app.factory("LibraryBuilder", ["Library", "Module", function(Library, Module) {

  var library = function(id) {
    return Library.get({id: id});
  };

  var addModule = function(name, libraryId, cb) {
    var module = new Module({name: name, library: libraryId});
    module.$save(cb); 
  };

  var removeModule = function(moduleId) {
    var module = Module.get({id: moduleId});
    module.$remove();
  }; 

  var editModuleName = function(name, moduleId) {
    var module = Module.get({id: moduleId}, function(data) {
      data.name = name;
      data.$update();
    });
  };

  return {
    library: library, 
    addModule: addModule, 
    removeModule: removeModule,
    editModuleName: editModuleName
  } 
}]);