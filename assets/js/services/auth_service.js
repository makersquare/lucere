// app.factory("CachedLibraries", function() {

// });

app.factory("AuthService", ["$http", "$location", "StateTracker", function($http, $location, StateTracker) {
  var service = {};
  var request;

  service.isLoggedIn = function() {
    return !!service.currentUser;
  };

  service.isAdmin = function() {
    if (!service.isLoggedIn()) { return false; }
    return service.currentUser.administrating.length > 0;
  };

  service.isSuperAdmin = service.isAdmin;

  var hasAccess = function(options) {
    if (!service.isLoggedIn()) { return false; }

    var listKey = options.admin ? "administrating" : "teams";
    var itemKey = options.library ? "library" : "id";

    var result = false;
    service.currentUser[listKey].forEach(function(item) {
      if (item[itemKey] == options.id) {
        result = true;
      }
    })
    return result;
  }

  service.isTeamMember = function(teamId) {
    return hasAccess({
      id: teamId
    });
  };

  service.isTeamAdmin = function(teamId) {
    return hasAccess({
      id: teamId,
      admin: true
    });
  };

  service.checkTeamAdmin = function(team, userId) {
    var res = false;
    team.admins.forEach(function(admin) {
      if (admin.id == userId) {
        res = true;
      }
    });
    return res;
  };

  service.isLibraryMember = function(libraryId) {
    return hasAccess({
      id: libraryId,
      library: true
    });
  };

  service.isLibraryMember = function(libraryId, teamId) {
    var result = false;
    service.currentUser.teams.forEach(function(team) {
      if (team.library == libraryId && teamId == team.id) {
        result = true;
      }
    });
    return true;
  };

  service.isLibraryAdmin = function(libraryId) {
    return hasAccess({
      id: libraryId,
      library: true,
      admin: true
    });
  };

  service.authorizeStudent = function(cb) {
    return userRequest().success(function(data) {
      if (!data) {
        $location.path("/login");
      } else if(cb) {
        cb(data);
      }
    })
    .error(function() {
      $location.path("/login");
    });
  };

  service.authorizeAdmin = function() {
    return service.authorizeStudent(function(data) {
      if (!data.administrating || !data.administrating.length) {
        $location.path("/user/" + data.id);
      }
    });
  };

  var userRequest = function() {
    request = request || $http({
      method: "GET",
      url: "/user/currentuser"
    });
    request.success(function(data) {
      service.currentUser = data;
    });
    return request;
  };

  service.logout = function() {
    user = null;
    request = null;
    service.currentUser = null;
    $location.path("/login");
    $http.get("/logout");
  };

  return service;
}]);