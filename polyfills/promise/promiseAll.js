// var promise1 = new Promise(resolve => resolve(1));
// var promise2 = new Promise(resolve => resolve(2));
// var promise3 = new Promise(resolve => resolve(3));
// var promise4 = new Promise(resolve => resolve(4));
// const promiseArr = Promise.all([
//   promise1,
//   promise2,
//   promise3,
//   promise4,
// ])

// promiseArr.then(msg => console.log(msg)) // [1,2,3,4]

// params: (promiseArr: any[]) => Promise<any> 
// -------------
// function PromiseAll(promiseArr) {
//   const promiseLength = promiseArr.length;
//   const resultArr = [];
//   // let count = 0;
//   return new Promise((resolve, reject) => {
//     try {
//       if (promiseLength === 0) {
//         resolve(resultArr);
//       } else {
//         for (let i = 0; i < promiseArr.length; i++) {
//           promiseArr[i].then((value) => {
//             resultArr.push(value)
//           }, reason => reject(reason))
//         }
//         resolve(resultArr);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   })
// }

// var promise1 = new Promise(resolve => resolve(1));
// var promise2 = new Promise(resolve => resolve(2));
// var promise3 = new Promise(resolve => resolve(3));
// var promise4 = new Promise(resolve => resolve(4));

// PromiseAll([promise1, promise2, promise3, promise4]).then(result => console.log(result))



/**
 * render1 fetch1 -> render! 1
 * render2 fetch2 -> render! 2
 * render3 fetch3 -> render! 3
 */
let renderIndex = 0;
const resultMap = {};
function render() {
  if (renderIndex >= 4) {
    resultMap[4] && console.log(resultMap[4]);
    resultMap[4] = null;
  }
  if (renderIndex >= 6) {
    resultMap[2] && console.log(resultMap[2]);
    resultMap[2] = null;
  }
  if (renderIndex >= 7) {
    resultMap[1] && console.log(resultMap[1]);
    resultMap[1] = null;
  }
}
function renderInOrder(promiseArr) {
  promiseArr.forEach((promise, index) => {
    promise.then((v) => {
      switch (index) {
        case 0:
          renderIndex += 4;
          resultMap[4] = v;
          break;
        case 1:
          renderIndex += 2;
          resultMap[2] = v;
          break;
        case 2:
          renderIndex += 1;
          resultMap[1] = v;
          break;
        default:
          renderIndex = renderIndex;
          break;
      }
      console.log(renderIndex);
      render();
    })
  })
}

const fetch1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('fetch1');
  }, 4000)
})

const fetch2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('fetch2');
  }, 2000)
})

const fetch3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('fetch3');
  }, 3000)
})

fetchArr = renderInOrder([fetch1, fetch2, fetch3])
// const fetchArr = Promise.all([fetch1, fetch2, fetch3]).then(msg => console.log(msg))