app.directive("studentTopBarDirective", ["$location", "AuthService", function($location, AuthService) {
  return {
    templateUrl: "/js/templates/directives/student_top_bar_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        scope.currentUser = user;
      });
      scope.teamClick = function() {
        $location.path("/team/" + scope.currentUser.id);
      };
      scope.logout = function() {
        // using window.location instead of $location in order to make the route outside of angular.
        // TODO once an angular route for /logout is created this should be changed
        location.replace("/logout");
      };
    }
  };
}]);