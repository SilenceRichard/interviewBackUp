/**
 * 一个红绿灯
 * 按红灯2s
 * 绿灯3s
 * 黄灯1s的顺序循环显示
 */
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
function light(timer, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer)
  })
}

function doLight() {
  Promise.resolve().then(() => {
    return light(2000, red);
  }).then(() => {
    return light(3000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    doLight();
  })
}

async function doLight2() {
  while (true) {
    await light(2000, red);
    await light(3000, green);
    await light(1000, yellow);
  }
} 

doLight2();