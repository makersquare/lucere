app.factory("BarService", ["$location", "$route", "AuthService", function($location, $route, AuthService) {
  var setLinks = function(scope, attr, elem, cb) {
    AuthService.currentUser(function(user) {
      scope.currentUser = user;
      scope.teamList = user.teams;
      
      if(user.teams) {
        scope.libraries = [];
        user.teams.forEach(function(t) {
          scope.libraries.push(t.library);
        });
      }

      if(cb) {
        cb($route);
      }
    });

    scope.logout = function() {
      AuthService.logout();
    };

    scope.getAdminLibrary = function(lId) {
      $location.path("/admin/library/"+lId);
    };

    scope.getAdminTeam = function(tId) {
      $location.path("/admin/team/"+tId);
    };

    scope.getLibrary = function(lId) {
      $location.path("/library/"+lId);
    };

    scope.getTeam = function(tId) {
      $location.path("/team/"+tId);
    };

  };

  return {
    setLinks: setLinks
  };
}]);