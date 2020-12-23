/*
var foo = {value: 1};
var bar = function(name, age) {
  this.name = name;
  this.age = age;
  return this.value;
}
var bar2 = function(name, age) {
  this.name = name;
  this.age = age;
  return ''; // return a base value
}

var bar3 = function(name, age) {
  this.name = name;
  this.age = age;
  return {
    code: 100,
    speech: 65,
  }; // return a base value
}

var newBar = new bar('Richard', 25);
var newBar2 = new bar2('Kevin', 24);
var newBar3 = new bar3('Steven', 23);
console.log(newBar.age, newBar.name);
// 25 Richard
console.log(newBar2.age, newBar2.name);
// 24 Kevin
console.log(newBar3.age, newBar3.name);
// undefined undefined
*/

/**
 * 返回一个新对象
 * this 指向新对象
 * 立即执行构造函数，可传参
 * 继承构造函数的原型
 * 继承构造函数的方法
 * 如果构造函数有return
 *  return 非对象值，this指向不变
 *  return 对象， this指向return的对象
 * */
function myNew() {
  var obj = Object.create(null);
  var constructor = [].shift.call(arguments);
  obj._proto_ = constructor.prototype;
  var result = constructor.apply(obj, arguments);
  if (typeof result === 'object') {
    return result;
  }
  return obj;
}