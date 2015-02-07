app.directive("adminSidebarDirective", ["$route", "Module", "StateTracker", function($route, Module, StateTracker) {
  return {
    templateUrl: "/js/templates/directives/admin_sidebar_template.html",
    link: function(scope, attr, elem) {
      scope.StateTracker = StateTracker;
    }
  };
}]);