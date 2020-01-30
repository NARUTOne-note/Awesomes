var App = angular.module('app',['ui.router']);

App.config(['$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
    /* 使用when来对一些不合法的路由进行重定向 */
    $urlRouterProvider
    	.when('/', '/home')
    	.otherwise('/404');
    /* 通过$stateProvider的state()函数来进行路由定义 */
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    }).state('detail', {
        url: '/detail',
        templateUrl: 'views/detail.html',
        controller: 'detailCtrl'
    }).state('detail.list', {
    	url:'/list',
	    templateUrl: 'views/detail.list.html'
	  }).state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
    })
}])
.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);
