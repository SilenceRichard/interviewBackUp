/**
 * 将一个callback函数promise化
 * function callbackfn(params, cb) {
 *  // do sth;
 *  cb(err, values);
 * }
 * cb 第一个参数是错误信息，后为传入的values
 */

 function promisify(original) {
   if (typeof original !== 'function') {
     return;
   }
   return function (...args) {
     return new Promise((resolve, reject) => {
        args.push(function callback(err, ...values) {
          if (err) {
            return reject(err);
          }
          return resolve(...values);
        });
        original.apply(this, args);
     })
   }
 }