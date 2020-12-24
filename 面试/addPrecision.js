function splitNum(num) {
  var floatNum = num.toString();
  var splitNum = floatNum.split('.');
  var intNum = splitNum[0];
  var fNum = splitNum[1] ? splitNum[1] : '0';
  return {
    intNum,
    fNum
  }
}

function add(a, b) {
  const numA = splitNum(a);
  const numB = splitNum(b);
  const intPart = Number(numA.intNum) + Number(numB.intNum);
  // 小数位相差
  const i = Math.abs(numA.fNum.length - numB.fNum.length) * 10 || 1;
  let floatPart = 0;
  if (numA.fNum.length > numB.fNum.length) {
    floatPart = Number(numA.fNum) + Number(numB.fNum) * i;
  } else {
    floatPart = Number(numA.fNum) * i + Number(numB.fNum);
  }
  return Number(`${intPart}.${floatPart}`)
}

console.log(add(0.1, 0.2));