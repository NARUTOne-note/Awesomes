App.controller('homeCtrl', ['$scope', function($scope) {
	
}])

App.controller('detailCtrl', ['$scope', function($scope) {
	$scope.arrList = [
		{
			name:'张三',
			sex: 1,
			age: 23
		},
		{
			name:'小明',
			sex: 1,
			age: 23
		},
		{
			name:'李四',
			sex: 1
		},
		{
			name:'小红',
			sex: 0,
			age: 23
		}
	]
}])