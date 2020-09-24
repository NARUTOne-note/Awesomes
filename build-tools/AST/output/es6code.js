import fun3 from "./fun3";
import fun2 from "./fun2";
import fun1 from "./fun1";

(function () {
  var Demo = function () {};

  Demo.prototype.fun1 = fun1;
  Demo.prototype.fun2 = fun2;
  Demo.prototype.fun3 = fun3;
})();