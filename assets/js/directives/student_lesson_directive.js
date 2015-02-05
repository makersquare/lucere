app.directive("studentLessonDirective", ["$routeParams", "Lesson", function($routeParams, Lesson) {
  return {
    templateUrl: "/js/templates/directives/student_lesson_template.html",
    link: function(scope, elem, attr) {
      Lesson.get({id: $routeParams.lessonId}, function(data) {
        var content = marked(data.body);
        angular.element.find("#student-lesson-display")[0].innerHTML = content;
        angular.forEach(elem.find("code"), function(value) {
          hljs.highlightBlock(value);
        });
      });
    }
  };
}]);