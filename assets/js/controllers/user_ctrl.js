app.controller("userCtrl", ["$scope", "$routeParams", "User", "AuthService", function($scope, $routeParams, User, AuthService){
  var userId  = parseInt($routeParams.userId);
  $scope.user = User.User.get({id: userId});
  $scope.isOwn = false;
  var currentUser;
  AuthService.currentUser(function(user) {
    $scope.isOwn = userId === user.id;
  });

  $scope.update = function() {
    console.log("clicked")
    angular.element("#user-profile").children("input").forEach(function(v) {
      console.log(v.val());
    });
  }

  $scope.editUser = function() {
    var $elem = angular.element("#user-profile");
    $elem.children().remove();
    $elem.append("<input type='text' value='"+ $scope.user.name + "'><br>");
    $elem.append("<input type='text' value='" + $scope.user.email + "'><br>");
    $elem.append("<input type='text' value='" + $scope.user.github + "'><br>");
    $elem.append("<input type='text' value='" + $scope.user.twitter + "'><br>");
  }

}]);
