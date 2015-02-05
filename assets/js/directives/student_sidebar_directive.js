app.directive("studentSidebarDirective", ["$route", "Module", function($route, Module) {
  return {
    templateUrl: "/js/templates/student_sidebar_template.html",
    link: function(scope, elem, attr) {
      Module.query({library: $route.current.params.libraryId}, function(modules) {
        scope.library = modules;
      });
    }
  };
}]);