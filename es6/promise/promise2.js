
/**
 * 定时任务，调用then方法时promise仍处于pending状态！此时不会返回任何东西
 * 解决异步场景调用then
 * 用一个数据将then方法保存起来
 * resove时-传入value，统一调用resolveArr
 * reject时-传入reason,统一调用rejectArr
 */

const PENDING = 'pending';
const FULLFILED = 'fullfiled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(callback) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.resolveArr = [];
    this.rejectArr = [];
    callback(this.resolve, this.reject);
  }
  resolve = (value) => {
    if (this.state === PENDING) {
      this.value = value;
      this.state = FULLFILED;
      this.resolveArr.forEach(fn => fn(value))
    }
  }
  reject = (reason) => {
    if (this.state === REJECTED) {
      this.reason = reason;
      this.state = REJECTED;
      this.rejectArr.forEach(fn => fn(reason))
    }
  }
  then = (onFullfiled, onRejected) => {
    if (this.state === PENDING) {
      return new MyPromise((resolve, reject) => {
        try {
          this.resolveArr.push((value) => {
            const result = onFullfiled(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result);
            }
          })
          this.rejectArr.push((reason) => {
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

const p2 = new MyPromise(r => setTimeout(() => {
  r(2)
}, 0)).then(msg => console.log(msg))