app.controller("userCtrl", ["$scope", "$routeParams", "User", "AuthService", function($scope, $routeParams, User, AuthService){
  var userId  = parseInt($routeParams.userId);
  $scope.user = User.User.get({id: userId});
  $scope.isOwn = false;
  var currentUser;
  AuthService.currentUser(function(user) {
    $scope.isOwn = userId === user.id;
  });

  $scope.update = function() {
    var $elem = angular.element("#user-profile");
    var $elems = $elem.children("input")

    $scope.user.name = angular.element($elems[0]).val();
    $scope.user.email = angular.element($elems[1]).val();
    $scope.user.twitter = angular.element($elems[3]).val();
    $scope.user.$update();

    $elem.children().remove();
    $elem.append("<p>"+ $scope.user.name + "</p>");
    $elem.append("<p>" + $scope.user.email + "</p>");
    $elem.append("<p>" + $scope.user.github + "</p>");
    $elem.append("<p>" + $scope.user.twitter + "<p>");
    $elem.append("<button>Edit</button>")
    $elem.find("button").on("click", function() {
      $scope.editUser();
    });
  }

  $scope.editUser = function() {
    var $elem = angular.element("#user-profile");
    $elem.children().remove();
    $elem.append("<input type='text' value='"+ $scope.user.name + "'><br>");
    $elem.append("<input type='text' value='" + $scope.user.email + "'><br>");
    $elem.append("<input type='text' disabled value='" + $scope.user.github + "'><br>");
    $elem.append("<input type='text' value='" + $scope.user.twitter + "'><br>");
    $elem.append("<button>Submit</button>")
    $elem.find("button").on("click", function() {
      $scope.update();
    });
  }

}]);
