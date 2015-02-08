app.directive("studentSidebar", ["AuthService", "AuthService", "StateTracker", function(AuthService, AuthService, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/student_sidebar.html",
    link: function(scope, attr, elem) {
      scope.StateTracker = StateTracker;
      scope.AuthService = AuthService;
    }
  };
}]);