
// var foo = {value: 1};
// var bar = function (name, age) {
//   console.log('this', this)
//   this.name = name;
//   this.age = age;
//   return this.value;
// }

// var bindFoo = bar.bind(foo, 'Richard', 25);
// var newBind = new bindFoo();
// console.log(bindFoo(), foo.name, foo.age, newBind.name);

/**
 * 返回一个函数
 * 绑定指定的this
 * 传入额外的参数：a1,a2,a3...
 * 可以传入新的参数
 * 用构造函数创建，new this指向新的变量
 */

Function.prototype.myBind = function(ctx) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fn = function () {
    var newArgs = Array.prototype.slice.call(arguments);
    var that = this instanceof fn ? this : ctx;
    // 新参数拼接在原参数之后
    self.apply(that, args.concat(newArgs));
  }
  return fn;
}


var foo = {value: 1};
var bar = function (name, age) {
  console.log('this', this)
  this.name = name;
  this.age = age;
  return this.value;
}

var bindFoo = bar.myBind(foo, 'Richard');
var newBind = new bindFoo(25);

console.log(newBind.age)