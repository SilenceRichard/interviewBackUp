/**
 * var bar = {a: 1, b:2, c:3, d: 4}
 * 创建一个新对象
 * 遍历复制对象的属性
 * 将bar[key]赋值给新对象
 * 判断： bar.hasOwnProperty(key),是否为复制对象的固有
 * 拷贝的值必须为一个对象
 */

function shallowCopy(obj) {
  if (typeof obj !== 'object') {
    return;
  }
  var mapping = {};
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      mapping[key] = obj[key];
    }
  }
  return mapping;
}

var bar = {a: 1, b:2, c:3, d: 4, e: function() {}};
var foo = shallowCopy(bar);
console.log(foo);