app.directive("adminTopNavDirective", ["$location", "$http", "$route", "AuthService", "User", function($location, $http, $route, AuthService, User) {
  return {
    templateUrl: "/js/templates/directives/admin_top_nav_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        scope.currentUser = user;
        var teams = user.administrating;
        var id = parseInt($route.current.params.libraryId) || parseInt($route.current.params.teamId);

        for (var i = 0; i < teams.length; i++) {
          if (id === 1) {
            scope.libraryTag = "Core";
            scope.teamList = teams;
          } else if(teams[i].id === id) {
            scope.libraryTag = teams[i].name;
            teams.splice(i,1);
            teams.push({id:1,name:"Core"});
            scope.teamList = teams;
          }
        }
      });

      scope.logout = function() {
        $http.get("/logout");
        scope.currentUser = "";
        $location.path("/login");
      };     

      scope.getLibrary = function() {
        var teamId = $route.current.params.teamId || $route.current.params.libraryId;
        $location.path("/admin/library/"+teamId);
      };

      scope.getTeam = function() {
        var libraryId = $route.current.params.libraryId || $route.current.params.teamId;
        $location.path("/admin/team/"+libraryId);
      }

      scope.changeLibrary = function(id) {
        var libraryId = $route.current.params.libraryId;
        if (libraryId === 1) {
          $location.path("/admin/library/"+id);
        } else {
          $location.path("/admin/team/"+id)
        }
        
      };
    }
  }
}]);