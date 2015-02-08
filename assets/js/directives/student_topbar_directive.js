app.directive("studentTopbar", ["AuthService", "StateTracker", function(AuthService, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/student_topbar.html",
    link: function(scope, attr, elem) {
      scope.AuthService = AuthService;
      scope.StateTracker = StateTracker;
    }
  };
}]);