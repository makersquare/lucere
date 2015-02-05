app.directive("adminModuleDirective", ["$route", "Module", "Lesson", function($route, Module, Lesson) {
  return {
    templateUrl: "/js/templates/directives/admin_module_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      scope.module = Module.get({id: scope.params.moduleId}, function(data) {
        scope.currentName = data.name;
      });

      scope.createLesson = function(title) {
        var lesson = new Lesson({title: title});
        // Save the new lesson to the database
        // Push the new lesson into the module.lessons array
        // Save the module with the newly added lesson
        lesson.$save(function(data) {
          scope.module.lessons.push(data.id);
          scope.module.$save(function(data) {
            scope.newLessonTitle = "";
          });
        });
      };

      // Activate "Save Changes" button if the new name doesn't equal the original name
      scope.checkName = function(moduleName) {
        if (moduleName === scope.currentName) {
          return true;
        } else {
          return false;
        }
      };

      scope.updateName = function() {
        scope.module.$update(function() {
          $route.reload();
        });
      };
    }
  };
}]);