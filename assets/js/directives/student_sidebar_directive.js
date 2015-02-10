app.directive("studentSidebar", ["StateTracker", function(StateTracker) {
  return {
    templateUrl: "/js/templates/directives/student_sidebar.html",
    link: function(scope, attr, elem) {
      scope.StateTracker = StateTracker;
    }
  };
}]);