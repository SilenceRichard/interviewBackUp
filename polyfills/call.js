/**
 *  var foo = {value: 1};
 *  var bar = function (name) {
 *    this.name = name;
 *    return this.value
 *  }
 *  bar.call(foo, 'Richard')
 *  立即执行函数
 *  使用指定的this
 *  可传入额外的参数（a1, a2, a3 ...)
 *  有返回值 
 * 
 *  bar.call(foo, args) === foo: {value:1, bar: fn(){ ... } }
 *  foo.bar();
 *  delete foo.bar
 */
Function.prototype.myCall = function (ctx) {
  var args = [];
  ctx.fn = this;
  for (var i=1; i<arguments.length; i ++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('ctx.fn(' + args +')');
  delete ctx.fn;
  return result;
}

var foo = {value:1};
function bar(name) {
  this.name = name;
  console.log(this.value);
  return this.value;
}

console.log(bar.myCall(foo, 'Richard'));
