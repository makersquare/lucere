app.directive("adminTopbar", ["AuthService", "StateTracker", function(AuthService, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/admin_topbar.html",
    link: function(scope, attr, elem) {
      scope.AuthService = AuthService;
      scope.StateTracker = StateTracker;
    }
  };
}]);
