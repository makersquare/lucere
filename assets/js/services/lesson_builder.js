app.factory("LessonBuilder", ["Lesson", function(Lesson) {

  var editLesson = function(body, lesssonId) {
    var lesson = Lesson.get({id: lessonId}, function(data) {
      data.body = body;
      data.$update();
    });
  };

  return {
    editLesson: editLesson
  };
}]);