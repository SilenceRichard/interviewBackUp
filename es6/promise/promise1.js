/**
 * const p = new Promise((resolve, rejecte) => {
 *  // do sth
 * })
 * Promise构造函数接收一个callback,
 * 有三种状态
 * pending
 * fullfiled
 * rejected
 * then方法接收两个形参(onFullfilled, onRejected),这两个形参不为function类型时则忽略
 * onFullfilled在fullfilled状态被调用，接收resolve的value值
 * onRejected在rejected状态被调用，接收reject的err信息
 * 它们均返回一个新的promise对象
 */
const PENDING = 'pending';
const FULLFILED = 'fullfiled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(callback) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    callback(this.resolve, this.reject)
  }
  resolve = (value) => {
    this.value = value;
    this.state = FULLFILED;
  }
  reject = (reason) => {
    this.reason = reason;
    this.state = REJECTED;
  }
  then = (onFullfiled, onRejected) => {
    if (this.state === FULLFILED) {
      return new MyPromise((resolve, reject) => {
        try {
          const result = onFullfiled(this.value);
          // 如果onFullfiled返回promise对象，调用then方法
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      })
    }
    if (this.state === REJECTED) {
      return new MyPromise((resolve, reject) => {
        try {
          const result = onRejected(this.reason);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}

const p = new MyPromise((r) => r(2)).then(msg => new MyPromise(r => r(msg)).then(msg2 => console.log(msg2)))
// 2

/**
 * 定时任务，调用then方法时promise仍处于pending状态！此时不会返回任何东西
 */
const p2 = new MyPromise(r => setTimeout(() => {
  r(2)
}, 0)).then(msg => console.log(msg))