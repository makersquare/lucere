app.directive("adminSidebar", ["$route", "StateTracker", function($route, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/admin_sidebar.html",
    link: function(scope, attr, elem) {
      scope.StateTracker = StateTracker;
    }
  };
}]);