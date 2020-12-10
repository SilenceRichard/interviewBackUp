// 1. 改变this, 立即执行
Function.prototype.call1 = function (context) {
  context.fn = this;
  context.fn();
  delete context.fn;
};

var foo = {
  value: 1,
};

function bar() {
  console.log(this.value)
}

bar.call1(foo)