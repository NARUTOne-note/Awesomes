angular.module('myApp').run(['$templateCache', function($templateCache) {$templateCache.put('home.html','<h3>\r\n\tHome\u9875\r\n\t<a ui-sref="page1">\u9875\u9762asdfsf</a>\r\n</h3>');
$templateCache.put('page1.html','<h3>page1\u9875</h3>');
$templateCache.put('page2.html','<h3>page2\u9875</h3>');}]);