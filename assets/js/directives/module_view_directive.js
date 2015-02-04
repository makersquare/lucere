app.directive("moduleView", ["$route", "Module", "Lesson", function($route, Module, Lesson) {
  return {
    templateUrl: "/js/templates/module_view_template.html",
    link: function(scope, attr, elem) {
      scope.params = $route.current.params;
      scope.models = {
        selected: null,
        lists: []
      };
      scope.inOrder = true;

      scope.module = Module.get({id: scope.params.moduleId}, function(data) {
        scope.currentName = data.name;
        data.lessons.forEach(function(lesson){
          // initializes the drag list
          scope.models.lists.push(lesson)
          // scope.currentOrder preserves the original order
          scope.currentOrder = scope.models.lists.filter(function(v){
            return v;
          });

          scope.module.lessons.push
        });
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
        if (moduleName === scope.currentName && scope.inOrder) {
          return true;
        } else {
          return false;
        }
      };

      scope.updateModule = function() {
        scope.module.idx = [];
        scope.models.lists.forEach(function(lesson){
          scope.module.idx.push(lesson);
        })
        scope.module.$update(function() {
          $route.reload();
        });
      };
      
      scope.$watch('models', function(model){
        var length = model.lists.length;

        for(var i = 0; i < length; i++) {
          if (model.lists[i] !== scope.currentOrder[i]) {
            scope.inOrder = false;
            return scope.inOrder;
          }
        }
      }, true);

    }
  }
}]);