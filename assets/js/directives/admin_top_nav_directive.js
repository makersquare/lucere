app.directive("adminTopNavDirective", ["$location", "$http", "$route", "AuthService", "User", function($location, $http, $route, AuthService, User) {
  return {
    templateUrl: "/js/templates/directives/admin_top_nav_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        scope.currentUser = user;
        scope.userArr = user.administrating;
        scope.libraryTag = "Core";
        var teams = user.administrating;
        var id = parseInt($route.current.params.libraryId) || parseInt($route.current.params.teamId);
        if (scope.userArr.length > 1) {
          scope.dropCheck = true;
        } else {
          scope.dropCheck = false;
        }
        for (var i = 0; i < teams.length; i++) {
          if (id === 1) {
            scope.libraryTag = "Core";
            scope.userArr.shift();
          } else if(teams[i].id === id) {
            scope.libraryTag = teams[i].name;
            //loop through user array to remove the name that will be displayed on nav bar
            for (var j = 0; j < scope.userArr.length; j++) {
              if(teams[i].name === scope.userArr[j].name) {
                scope.userArr.splice(j,1);
              }
            }
            //first item in list should be core or core should be displayed on nav bar
            if (scope.userArr[0].name !== "Core") {
              scope.userArr.unshift({id:1,name:"Core"});
            } 
          }
        }

        scope.getTeam = function() {
          var id = $route.current.params.libraryId || $route.current.params.teamId || user.administrating[0].id;
          $location.path("/admin/team/"+id);
        }
      });

      scope.logout = function() {
        $http.get("/logout");
        scope.currentUser = "";
        $location.path("/login");
      };     

      scope.changeLibrary = function(id) {
          $location.path("/admin/team/"+id);        
      };

      scope.getLibrary = function() {
        var id = $route.current.params.libraryId || $route.current.params.teamId || 1; //will need to checkout library in first administrating
        $location.path("/admin/library/"+id);
      };
    }
  }
}]);