app.directive("adminTopNavDirective", ["$location", "$http", "$route", "AuthService", "User", function($location, $http, $route, AuthService, User) {
  return {
    templateUrl: "/js/templates/admin_top_nav_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        scope.currentUser = user;
        var teams = user.administrating;
        var teamId = $route.current.params.teamId;
        var libraryId = parseInt($route.current.params.libraryId);

        for (var i = 0; i < teams.length; i++) {
          console.log(teams[i]);
          if (libraryId === 1) {
            scope.libraryTag = "Core";
            console.log("core")
            scope.teamList = teams;
            console.log(scope.libraryTag);
          } else if(teams[i].id === teamId) {
            scope.libraryTag = teams[i].name;
            scope.teamList = teams;
            console.log(teams[i].name)
          }

        }
      });

      scope.logout = function() {
        $http.get("/logout");
        $location.path("/login");
      };     

      // scope.libraryTag = $route.current.params.teamId == 1 ? "Core" : "SFC3";

      scope.getLibrary = function() {
        var teamId = $route.current.params.teamId;
        $location.path("/team/"+teamId+"/library/"+teamId);
      };

      scope.getTeam = function() {
        var teamId = $route.current.params.teamId;
        $location.path("/team/"+teamId)
      }

      scope.changeLibrary = function(id) {
        var libraryId = $route.current.params.libraryId;
        if (libraryId === 1) {
          $location.path("/team/"+id+"/library/"+1);
        } else if(libraryId) {
          $location.path("/team/"+id+"/library/"+1);
        } else {
          $location.path("/team/"+id);
        }
        
      };
    }
  }
}]);