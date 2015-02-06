app.directive("studentSidebarDirective", ["Module", "AuthService", function(Module, AuthService) {
  return {
    templateUrl: "/js/templates/directives/student_sidebar_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        if(user) {
          Module.query({library: user.teams[0].library}, function(data) {
          scope.modules = data;
          });
        }
      });
    }
  };
}]);