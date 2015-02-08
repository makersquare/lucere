app.factory("StateTracker", ["Library", "Module", "$route", "$q", '$location', function(Library, Module, $route, $q, $location) {
  var currentState = {};

  var viewAsMode = false, viewAsLibrary;

  var currentUser;

  currentState.showAdminFunctionality = false;

  currentState.viewAs = function(team) {
    viewAsMode = true;
    currentState.viewAsTeam = team;
    currentState.updateViewAsPreference();
    $location.path("/library/" + team.id);
  };

  currentState.viewAsAdmin = function() {
    viewAsMode = false;
    currentState.viewAsTeam = undefined;
    currentState.updateViewAsPreference();
    $location.path("/admin/library/" + currentState.library.id);
  };

  currentState.updateViewAsPreference = function(user) {
    // You cannot view as admin if you are not signed in
    // You cannot view as admin if you are not an administrator
    // You cannot view as admin if you are viewing as a student
    if (user) { currentUser = user };
    currentState.showAdminFunctionality = currentUser
      && currentUser.administrating.length
      && !viewAsMode;

    return currentState.showAdminFunctionality;
  };

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