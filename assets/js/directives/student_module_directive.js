app.directive("studentModuleDirective", ["$route", "Module", "Lesson", function($route, Module, Lesson) {
  return {
    templateUrl: "/js/templates/student_module_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      scope.module = Module.get({id: scope.params.moduleId}, function(data) {
        scope.currentName = data.name;
      });
    }
  }
}]);