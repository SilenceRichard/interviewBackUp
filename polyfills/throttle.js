/**
 * fn在n秒内只触发一次
 * throttle(fn, 1000)
 * 1. 时间戳判断， 可以立即执行， 停止触发后不会执行最后一次
 * 2. setTimeout, 停止触发后会执行最后一次，不会立即执行
 */
function throttle(fn, wait) {
  var prev = 0;
  var timer = null;
  var now;
  var remaining;
  function callFn () {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    now = new Date().getTime();
    remaining = wait - (now - prev);
    /**
     * 执行最后一次
     */
    function later () {
      prev = new Date().getTime();
      timer = null;
      fn.apply(self, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    // 如果没有剩余时间或修改了wait参数
    if (remaining <= 0 || remaining > wait ) {
      // 立即执行
      fn.apply(self, args);
      prev = now;
    } else if(!timer) { // TODO:
      timer = setTimeout(later, remaining)
    }
  }
  return callFn;
}