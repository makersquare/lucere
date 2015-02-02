app.controller("teamCtrl", ["$scope", "$routeParams", "Team", function($scope, $routeParams, Team){
  $scope.team = Team.get({id: $routeParams.teamId});
  
  $scope.remove = function(userId) {
    $scope.team.users = $scope.team.users.filter(function(v) {
      if(v.id !== userId) {
        console.log(v.id);
        return v;
      }
    });
    console.log($scope.team.user);
    $scope.team.$update();
  };
}]);