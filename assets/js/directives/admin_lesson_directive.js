app.directive("adminLessonDirective", ["$routeParams", "Lesson", function($routeParams, Lesson) {
  return {
    templateUrl: "/js/templates/admin_lesson_template.html",
    link: function(scope, elem, attr) {
      // query database for lesson based on route params
      Lesson.get({id: $routeParams.lessonId}, function(data) {
        // instantiate new instance of Editor
        var editor = new Editor();
        // Append save function to toolbar via floppy icon
        Editor.toolbar[13] = {
          name: "save", 
          // trigger update request with new contents
          action: function() {
            var content = editor.codemirror.getValue();
            data.body = content;
            data.$update(function(test) {
              // confirm successul update
            });
          }, 
          className: "glyphicon glyphicon-floppy-disk"
        };
        editor.render();
        // load queried resource into Editor
        editor.codemirror.setValue(data.body || "");
        // trigger code highlighting overlay
        var iconPreview = document.getElementsByClassName("icon-preview")[0];
        angular.element(iconPreview).bind("click", function() {
          angular.forEach(elem.find("code"), function(value) {
            hljs.highlightBlock(value);
          });
        });
      });
    }
  };
}]);