app.controller("teamCtrl", ["$scope", "$routeParams", "Team", function($scope, $routeParams, Team){
  $scope.team = Team.get({id: $routeParams.teamId});
}]);