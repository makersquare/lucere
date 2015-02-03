app.directive("studentSidebarDirective", ["$route", "Library", function($route, Library) {
  return {
    templateUrl: "/js/templates/student_sidebar_template.html",
    link: function(scope, elem, attr) {
      Library.get({id: $route.current.params.libraryId}, function(data) {
        scope.library = data.modules;
      });
    }
  };
}]);