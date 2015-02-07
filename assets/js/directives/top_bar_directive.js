app.directive("topBarDirective", ["AuthService", function(AuthService) {
  return {
    templateUrl: "/js/templates/directives/top_bar_template.html",

    link: function(scope, attr, elem) {
      console.log(AuthService);
      AuthService.currentUser(function(user) {
        console.log(scope);
        scope.currentUser = user;
        scope.currentUser.teams.forEach(function(team) {
          team.isAdmin = scope.currentUser.administrating.some(function(teamId) {
            return teamId == team.id;
          });
          team.libraryLink = "#" + (team.isAdmin ? "/admin" : "") + "/library/" + team.library;
          team.teamLink = "#" + (team.isAdmin ? "/admin" : "") + "/team/" + team.id;
          console.log(team);
        });
        scope.areMultipleTeams = scope.currentUser.teams.length > 1;
      });
    }
  };
}]);