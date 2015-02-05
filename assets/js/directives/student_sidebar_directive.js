app.directive("studentSidebarDirective", ["$route", "Module", function($route, Module) {
  return {
    templateUrl: "/js/templates/directives/student_sidebar_template.html",
    link: function(scope, attr, elem) {
      Module.query({library: $route.current.params.libraryId}, function(data) {
        scope.modules = data;
      });
    }
  };
}]);