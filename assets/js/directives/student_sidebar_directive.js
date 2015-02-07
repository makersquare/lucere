app.directive("studentSidebarDirective", ["Module", "AuthService", "StateTracker", function(Module, AuthService, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/student_sidebar_template.html",
    link: function(scope, attr, elem) {
      AuthService.currentUser(function(user) {
        if(user) {
          scope.StateTracker = StateTracker;
          StateTracker.loadLibrary(user.teams[0].library);
        }
      });
    }
  };
}]);