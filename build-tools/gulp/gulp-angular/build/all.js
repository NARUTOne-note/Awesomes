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
angular.module('myApp').run(['$templateCache', function($templateCache) {$templateCache.put('home.html','<h3>\r\n\tHome\u9875\r\n\t<a ui-sref="page1">\u9875\u9762</a>\r\n</h3>');
$templateCache.put('page1.html','<h3>page1\u9875</h3>');
$templateCache.put('page2.html','<h3>page2\u9875</h3>');}]);
angular.module('myApp')
  .controller('homeController', ['$scope', function ($scope) {
		console.log('homeasdasd')
  }]);
angular.module('myApp')
  .controller('page1Controller', ['$scope', function ($scope) {
  	
		alert('welcome!')
  }]);
angular.module('myApp')
  .controller('page2Controller', ['$scope', function ($scope) {
  	
		alert('welcome!')
  }]);