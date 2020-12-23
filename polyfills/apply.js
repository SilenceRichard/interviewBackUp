/**
 * var foo = {value: 1};
 * var bar = function (name, age) {
 *   this.name = name;
 *   this.age = age;
 *   return this.value
 * }
 * bar.apply(foo, ['Richard', 24]);
 * 立即执行函数
 * 指定函数的this指向
 * 两个参数，args通过数组形式传递
 * 有返回值
 * 
 * @param {*} ctx 
 * @param {*} argsArr 
 */
Function.prototype.myApply = function(ctx, argsArr) {
  ctx.fn = this;
  var args = [];
  for (var i=0; i<argsArr.length; i ++) {
    args.push(`argsArr[${i}]`);
  }
  var result = eval(`ctx.fn(${args})`);
  delete ctx.fn;
  return result;
}

var foo = {value: 1};
var bar = function(name, age) {
  this.name = name;
  this.age = age;
  return this.value;
}

console.log(bar.myApply(foo, ['Richard', 25]))