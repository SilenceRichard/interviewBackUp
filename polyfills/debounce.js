/**
 * 事件触发后在ns后执行，如果在ns内触发事件，则重新计算时间
 * debounce(fn, 1000)
 * this, 传参
 * 返回结果, 如果是immediate模式，有返回值，否则返回值为undefined
 */
function debounce(fn, wait, immediate) {
  var timer;
  function callFn() {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        timer = null;
      }, wait);
    }
    var self = this;
    var args = arguments;
    timer = setTimeout(function () {
      fn.apply(self, args);
      timer = null;
    }, wait);
  }
  if (immediate) {
    var callNow = !timer;
    timer = setTimeout(function () {
      timer = null;
    }, wait);
    if (callNow) {
      var result = fn.apply(this, arguments);
      return result;
    }
  } else {
    return callFn;
  }
}
