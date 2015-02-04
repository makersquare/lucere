app.controller("userCtrl", ["$scope", "$routeParams", "User", "AuthService", function($scope, $routeParams, User, AuthService) {
  var userId  = parseInt($routeParams.userId);
  var userRecord = User.User.get({id: userId});
  $scope.userForm = {name: "", email: "", github: "", twitter: ""};
  $scope.userPar  = {name: "", email: "", github: "", twitter: ""};
  userRecord.$promise.then(function(user) {
    setForm();
    setUserPar();
  });

  $scope.isOwn = false;
  $scope.showForm = false;
  var currentUser;
  AuthService.currentUser(function(user) {
    $scope.isOwn = (userId === user.id);
  });

  var setValues = function(toBeSet, getValsFrom) {
    var keys = Object.keys(getValsFrom);
    keys.forEach(function(attr) {
      if(toBeSet[attr] != undefined) {
        toBeSet[attr] = getValsFrom[attr];
      }
    });
  };

  // Fill form with user details from db
  var setForm = function() {
    setValues($scope.userForm, userRecord);
  };

  // Set user record values to match submitted form values
  var setUserRecord = function() {
    setValues(userRecord, $scope.userForm);
  };

  // Set paragraph values to match submitted form values
  var setUserPar = function() {
    setValues($scope.userPar, $scope.userForm);
  };

  $scope.update = function() {
    $scope.showForm = false;
    
    // Check to make sure that user is updating own profile
    if($scope.isOwn) {
      setUserRecord();
      setUserPar();
      userRecord.$update();
    }
  };

  $scope.editUser = function() {
    $scope.showForm = true;
  };

  $scope.cancel = function() {
    $scope.showForm = false;
    setForm();
  };
}]);
