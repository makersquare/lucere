app.directive("studentLessonDirective", ["$routeParams", "Lesson", function($routeParams, Lesson) {
  return {
    templateUrl: "/js/templates/student_lesson_template.html",
    link: function(scope, elem, attr) {
      // query database for lesson based on route params
      Lesson.get({id: $routeParams.lessonId}, function(data) {
        var content = marked(data.body);
        angular.element.find("#student-lesson-display")[0].innerHTML = content;
      });
    }
  };
}]);