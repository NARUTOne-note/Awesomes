angular.module('myApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  var initState = function() {
    $state.go('home');
  };

  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('page1', {
      url: '/page1',
      templateUrl:"./app/template/page1.html", 
      cache: true,
      controller:'page1Controller'
    })
    .state('page2', {
      url: '/page2',
      templateUrl:"./app/template/page2.html",
      cache: true,
      controller:'page2Controller'
    })
    .state('home', {
      url: '/home',
      templateUrl:"./app/template/home.html",
      cache: true,
      controller: 'homeController'
    });
}]);