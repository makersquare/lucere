app.factory("LessonBuilder", ["Lesson", function(Lesson) {

  var lesson = function(id) {
    return Lesson.get({id: id});
  };

  var editLesson = function(body, lesson) {
    lesson.body = body;
    lesson.$update();
  };

  return {
    editLesson: editLesson
  };
}]);