/**
 * const p = new Promise((resolve, reject) => resolve(2))
 *  .then(msg => console.log(msg))
 */

class MyPromise {
  constructor(callback) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.resolveArr = [];
    this.rejectArr = [];
    callback
  }
  resolve = (value) => {
    // 
    if (this.state === 'pending') {
      // do resolve
      // state => fullfiled
    }
  }
  reject = (reason) => {
    //
  }
  then = (onFullfiled, onRejected) => {
    //
    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        try {
          this.resolveArr.push(value => {
            const result = onFullfiled(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          });
          this.rejectArr.push(reason => {
            const result = onRejected(reason);
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result);
            }
          })
        } catch (error) {
          reject(error)
        }
       
      })
    }
  }
}