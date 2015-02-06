app.directive("adminTopNavDirective", ["BarService", function(BarService) {
  return {
    templateUrl: "/js/templates/directives/admin_top_nav_template.html",
    link: function(scope, attr, elem) {
      BarService.setLinks(scope, attr, elem, function($route) {
        scope.userArr = scope.currentUser.administrating;
        var teams = scope.currentUser.administrating;
        var id = $route.current.params.libraryId || $route.current.params.teamId;
        if(scope.teamList.length > 1) {
          scope.dropCheck = true;
        } else {
          scope.dropCheck = false;
        }
        for(var i = 0; i < teams.length; i++) {
          if(id == 1) {
            scope.libraryTag = "Core";
            scope.userArr.shift();
          } else if(teams[i].id == id) {
            scope.libraryTag = teams[i].name;
            //loop through user array to remove the name that will be displayed on nav bar
            for(var j = 0; j < scope.userArr.length; j++) {
              if(teams[i].name === scope.userArr[j].name) {
                scope.userArr.splice(j,1);
              }
            }
            //first item in list should be core or core should be displayed on nav bar
            if(scope.userArr[0].name !== "Core") {
              scope.userArr.unshift({id:1, name:"Core"});
            } 
          }
        }
      });
    }
  };
}]);