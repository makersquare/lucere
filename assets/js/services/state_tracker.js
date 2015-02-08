app.factory("StateTracker", ["Library", "Module", "$route", "$q", function(Library, Module, $route, $q) {
  var currentState = {};

  currentState.setLibraryState = function() {
    var id = $route.current.params.libraryId;

    if (!currentState.library || currentState.library.id != id) {
      currentState.library = Library.get({id: id});
      currentState.modules = Module.query({library: id});
    }

    if (!currentState.libraries) {
      currentState.libraries = Library.query();
    }

    var resolves = {
      library: currentState.library.$promise,
      modules: currentState.modules.$promise,
      libraries: currentState.libraries.$promise
    };

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