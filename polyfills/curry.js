/**
 * function add (a, b) {
 *  return a + b;
 * }
 * var addCurry = curry(add);
 * addCurry(1)(2) // 3 === add(1,2)
 */
 function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {

  length = length || fn.length;

  var slice = Array.prototype.slice;

  return function() {
      if (arguments.length < length) {
          var combined = [fn].concat(slice.call(arguments));
          return curry(sub_curry.apply(this, combined), length - arguments.length);
      } else {
          return fn.apply(this, arguments);
      }
  };
}

//  function add(a, b) {
//    return a + b;
//  }

//  var addCurry = subCurry(add, 1);
//  console.log(addCurry(2));