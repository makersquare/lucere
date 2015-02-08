app.factory("StateTracker", ["Library", "Module", "$route", "$q", function(Library, Module, $route, $q) {
  var currentState = {};

  currentState.setLibraryState = function() {
    var id = $route.current.params.libraryId;
    var resolves = {};

    if (id && (!currentState.library || currentState.library.id != id)) {
      currentState.library = Library.get({id: id});
      resolves.library = currentState.library;
      currentState.modules = Module.query({library: id});
      resolves.modules = currentState.modules;
    }

    if (!currentState.libraries) {
      currentState.libraries = Library.query();
      resolves.libraries = currentState.libraries;

      resolves.libraries.$promise.then(function(libraries) {
        currentState.library = currentState.library || libraries[0];
        currentState.modules = Module.query({library: libraries[0].libraryId});
      });
    }

    console.log(resolves);

    return $q.all(resolves);
  }

  currentState.loadLibrary = function(id) {
    if(id) {
      currentState.library = Library.get({id: id});
      currentState.modules = Module.query({library: id});
      return currentState.library;
    }
  };

  currentState.refreshLibrary = function() {
    currentState.loadLibrary(currentState.library.id);
    currentState.libraries = Library.query();
  };

  return currentState;
}]);