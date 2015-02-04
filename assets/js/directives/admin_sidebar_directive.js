app.directive("adminSidebarDirective", ["$route", "Module", function($route, Module) {
  return {
    templateUrl: "/js/templates/admin_sidebar_template.html",
    link: function(scope, attr, elem) {
      Module.query({library: $route.current.params.libraryId}, function(data) {
        scope.library = data;
      });
    }
  }
}]);