app.directive("studentTopBarDirective", ["AuthService", function(AuthService) {
  return {
    templateUrl: "/js/templates/directives/student_top_bar_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        scope.currentUser = user;
      });
    }
  };
}]);