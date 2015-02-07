app.factory("StateTracker", ["Library", "Module", function(Library, Module) {
  var currentState = {};

  currentState.loadLibrary = function(id) {
    if(id) {
      currentState.library = Library.get({id: id});
      currentState.modules = Module.query({library: id});
      return currentState.library;
    }
  };

  currentState.refreshLibrary = function() {
    currentState.loadLibrary(currentState.library.id);
  };

  return currentState;
}]);