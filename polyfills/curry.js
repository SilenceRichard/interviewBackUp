/**
 * function add (a, b) {
 *  return a + b;
 * }
 * var addCurry = curry(add);
 * addCurry(1)(2) // 3 === add(1,2)
 */
/**
 * 对于两次调用情况的curry
 */
function subCurry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var newArgs = [].slice.call(arguments).concat(args);
        return fn.apply(this, args.concat(newArgs))
    }
}

/**
 * 这里补充一个知识点： curry(fn) {console.log(fn.length)}
 * 函数的length属性为其参数的长度
 * function 
 */
function curry(fn, args) {
    // 实际的形参数
    var length = fn.length;
    args = args || [];
    return function () {
        var _args = args.slice(0);
        for (var i = 0; i< arguments.length; i ++) {
            var arg = arguments[i];
            _args.push(arg);
        }
        if (_args.length < length) {
           return curry.call(this, fn, _args);
        }
        return fn.apply(this, _args);
    }
}

function add(a, b, c, d) {
    return a + b + c + d;
}
var addCurry = curry(add);
 // 3 === add(1,2)
console.log(addCurry(1,2)(3)(4));