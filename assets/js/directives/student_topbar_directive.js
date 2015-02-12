app.directive("studentTopbar", ["AuthService", "StateTracker", "Permissions", function(AuthService, StateTracker, Permissions) {
  return {
    templateUrl: "/js/templates/directives/student_topbar.html",
    link: function(scope, attr, elem) {
      scope.AuthService = AuthService;
      scope.StateTracker = StateTracker;
      scope.Permissions = Permissions;
    }
  };
}]);