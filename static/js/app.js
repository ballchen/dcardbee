var app = angular.module('FBAPP', ['ui.router', 'ngAnimate']);
var host = "localhost:3020"

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider) {
  	$stateProvider
  	.state('index', {
  		url: "/",
  		templateUrl: "partial/index.html",
  		controller: "MainCtrl"
  	})
    .state('result', {
		url: "/result",
		templateUrl: "partial/result.html",
		controller: "MainCtrl"
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

}]);

app.controller('MainCtrl', ['$scope', '$window', '$timeout', '$state', function($scope, $window, $timeout, $state){
  $scope.data = data;
  $scope.loading = false;

	$scope.select = function(){
    $scope.loading = true;
    $timeout(function() {
      $state.go('result');
    }, 1500);
	}

  $scope.share = function(){
    FB.ui({
      method: 'share',
      href: 'https://bee.ballchen.cc/share?id='+$scope.data.id
      // href: 'https://apps.facebook.com/beedcard/',
    }, function(response){});
  }
}])