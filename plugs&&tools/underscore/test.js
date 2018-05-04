/**
 * underscopeJS 
 * 
 * createDate: 2017/07/21
 * author: NARUTOne *
 *
 */

/**
 * 集合类Collections
 */

// _.each(list, iteratee, [context])
var each_obj = {
	'name': 'NARUTOne',
	'age': 23,
	'sex': 'Y'
}
_.each(each_obj, function(value, key, obj){
	console.log(key + ":" + value)
})

var person = {};
person.friends = {
  name1: true,
  name2: false,
  name3: true,
  name4: true
};

_.each(['name4', 'name2'], function(name){
  // this refers to the friends property of the person object
  console.log(this[name]);
}, person.friends);

// _.reduce(list, iteratee, [memo], [context]) 
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0); // 6

//_.every(list, [predicate], [context]) , 如果list中的所有元素都通过predicate的真值检测就返回true。 _some 只要有一个

_.every([true, 1, null, 'yes'], _.identity); // false

//invoke_.invoke(list, methodName, *arguments) 
//在list的每个元素上执行methodName方法。 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。

_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');  //[[1, 5, 7], [1, 2, 3]]

//pluck_.pluck(list, propertyName)  萃取属性, 返回数组

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name'); //["moe", "larry", "curly"]

//_.max(list, [iteratee], [context]) ||  _.min(list, [iteratee], [context]) 

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.max(stooges, function(stooge){ return stooge.age; }); //{name: 'curly', age: 60};

// _.sortBy(list, iteratee, [context]) 
_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); }); //=> [5, 4, 6, 3, 1, 2]

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.sortBy(stooges, 'name'); //=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];

//groupBy_.groupBy(list, iteratee, [context])

_.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }); //=> {1: [1.3], 2: [2.1, 2.4]}

_.groupBy(['one', 'two', 'three'], 'length'); //=> {3: ["one", "two"], 5: ["three"]}

//indexBy_.indexBy(list, iteratee, [context])  ,和groupBy非常像，但是当你知道你的键是唯一的时候可以使用indexBy 。

var stooges = [{name: 'moe', age: 40, sex: 0}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(_.indexBy(stooges, function(value, key){
	return this['age'] = 40;
}))
/*=> {
  "40": {name: 'moe', age: 40},
}*/

//_.countBy(list, iteratee, [context])  计数

_.countBy([1, 2, 3, 4, 5], function(num) {
  return num % 2 == 0 ? 'even': 'odd';
}); //=> {odd: 3, even: 2}


//_.toArray(list) 把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。

(function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4); //=> [2, 3, 4]

/*
 * 数组类 Array Functions  
 * 
 * */

//_.without(array, *values)  返回一个删除所有values值后的 array副本。

_.without([1, 2, 1, 0, 3, 1, 4], 0, 1); //=> [2, 3, 4]

//_.union(*arrays) 并集 || _.intersection(*arrays) 交集  || _.difference(array, *others) 非集

_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]); //=> [1, 2, 3, 101, 10]

_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]); // => [1, 2]

_.difference([1, 2, 3, 4, 5], [5, 2, 10]); // => [1, 3, 4]

// _.uniq(array, [isSorted], [iteratee])  去重

_.uniq([1, 2, 1, 3, 1, 4]); // [1, 2, 3, 4]


/*
 * 函数集 Function (uh, ahem) Functions
 * 
 * */

//_.bind(function, object, *arguments) 

var func = function(greeting){ return greeting + ': ' + this.name };
func = _.bind(func, {name: 'moe'}, 'hi');
func(); //=> 'hi: moe'

// _.throttle(function, wait, [options]) wait毫秒 || _.debounce(function, wait, [immediate]) 

var throttled = _.throttle(function(){}, 100);
//$(window).scroll(throttled);

var lazyLayout = _.debounce(function(){}, 300);
//$(window).resize(lazyLayout);

//_.after(count, function) || _.before(count, function) 
var notes = [];
var renderNotes = _.after(notes.length, function foo(){});
_.each(notes, function(note) {
  note.asyncSave({success: renderNotes});
});
// renderNotes is run once, after all notes have saved.

//_.compose(*functions)   f(g(h()))

var greet    = function(name){ return "hi: " + name; };
var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
var welcome = _.compose(greet, exclaim);
console.log(welcome('moe')); //hi: MOE!

/*
 *对象函数（Object Functions）
 * */

//_.pairs(object)

_.pairs({one: 1, two: 2, three: 3});
//=> [["one", 1], ["two", 2], ["three", 3]]


//_.extend(destination, *sources) 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 
//复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).

_.extend({name: 'moe'}, {age: 50});
//=> {name: 'moe', age: 50}

//_.omit(object, *keys)  过滤

_.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');
//=> {name: 'moe', age: 50}
_.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return _.isNumber(value);
});
//=> {name: 'moe', userid: 'moe1'}


//_.isEqual(object, other)  比相等

var stooge = {name: 'moe', luckyNumbers: [13, 27, 34]};
var clone  = {name: 'moe', luckyNumbers: [13, 27, 34]};
stooge == clone;
//=> false
_.isEqual(stooge, clone);
//=> true


//_.isEmpty(object)  判断空

_.isEmpty([1, 2, 3]);
//=> false
_.isEmpty({});
//=> true

//_.isArray(object) 数组判断

(function(){ return _.isArray(arguments); })();
//=> false
_.isArray([1,2,3]);
//=> true


/*
 * 实用功能(Utility Functions)
 * */

//_.mixin(object) 
//允许用您自己的实用程序函数扩展Underscore。传递一个 {name: function}定义的哈希添加到Underscore对象，以及面向对象封装。

_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_("fabio").capitalize();
=> "Fabio"

//_.escape(string)  转义HTML字符串，替换&, <, >, ", ', 和 /字符。 || _.unescape(string)

_.escape('Curly, Larry & Moe');
//=> "Curly, Larry &amp; Moe"

_.unescape('Curly, Larry &amp; Moe');
//=> "Curly, Larry & Moe"


//_.template(templateString, [settings])  模板编译

var compiled = _.template("hello: <%= name %>");
compiled({name: 'moe'});
//=> "hello: moe"

var template = _.template("<b><%- value %></b>");
template({value: '<script>'});
//=> "<b>&lt;script&gt;</b>"

/*
 *链式语法(Chaining)
 * */

_.map([1, 2, 3], function(n){ return n * 2; });
_([1, 2, 3]).map(function(n){ return n * 2; });