let baseStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';

let valCharMap = {}
let charValMap = {}

baseStr.split('').forEach((item, idx) =>{
  valCharMap[idx] = item
  charValMap[item] = idx
})


function decimalToNScale(n) {
  if(n > 64) {
    throw new RangeError('不支持64以上进制');
  }
  return (num) =>{
    if(typeof num !== 'number') {
      throw new TypeError('请输入number类型的值');
    }
    // 正负数
    let isPostiveNum = num > 0 ? true : false;
    // 整数部分
    let leftNum = parseInt(Math.abs(num));
    // 小数部分
    let rightNum = `${num}`.split('.')[1] || 0;
    let concatNum = [...decimalToNScaleByInt(n, leftNum), ...decimalToNScaleByDouble(n, `0.${rightNum}` * 1)]
    return isPostiveNum ? concatNum.join('') : ['-',...concatNum].join('')
  }
}

function decimalToNScaleByInt(n, intNum) {
  if(n > intNum) return [`${valCharMap[intNum]}`];
  let stack = [];
  let flag;
  while(intNum / n !== 0) {
    flag = intNum % n
    stack.unshift(valCharMap[flag])
    intNum = (intNum - flag) / n
  }
  return stack
}
function decimalToNScaleByDouble(n, smallNum) {
  if(smallNum === 0) return [];
  let stack = ['.'];
  let flag;
  while(smallNum !== 0) {
    smallNum = n * smallNum;
    flag = parseInt(smallNum);
    smallNum = smallNum - flag;
    stack.push(valCharMap[flag])
  }
  flag = null;
  return stack
}
export default decimalToNScale