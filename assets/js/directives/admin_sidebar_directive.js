app.directive("adminSidebar", ["$route", "AuthService", "StateTracker", function($route, AuthService, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/admin_sidebar.html",
    link: function(scope, attr, elem) {
      scope.StateTracker = StateTracker;
      scope.AuthService = AuthService;
    }
  };
}]);