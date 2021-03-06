var app = angular.module('FBAPP', ['ui.router', 'ngAnimate']);

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
    ga('send', 'event', 'FB', 'play', 'playbutton');
	}

  $scope.share = function(){
    ga('send', 'event', 'FB', 'share', 'sharebutton');
    console.log(mobilecheck);
    if(mobilecheck() == true) {
      shareurl = "https://www.facebook.com/dialog/share?app_id=527914474040018&display=popup&href=https://openschool.dcard.tw/share?id="+$scope.data.id+"&redirect_uri=https://app.facebook.com/dcardwelcome";
      window.open(shareurl);
    }
    else {
      // Use new FB.ui share method
      console.log('yo')
      FB.ui({
        method: 'share',
        href: 'https://openschool.dcard.tw/share?id='+$scope.data.id
        // href: 'https://apps.facebook.com/beedcard/',
      }, function(response){});
      
    }
  }
}])