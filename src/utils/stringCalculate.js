let testStr = 'f(1+(12+1)-(2+(4+5)-((2+5)+4-6)))'

function formatInput(str) {
  let reg = /^f\((.*?)\)$/
  try {
    let retStr = str.replace(/\s/g, '').match(reg)[1]
    if (!retStr) throw new Error('输入不合法')
    let stack = []
    let i = 0,
      len = retStr.length
    while (i < len) {
      if (retStr[i] === '(') {
        stack.push('(')
      }
      if (retStr[i] === ')') {
        stack.pop()
      }
      i++
    }
    if (stack.length !== 0) throw new Error('输入不合法')
    return retStr
  } catch (error) {
    console.log(error)
  }
}

function calculate(s) {
  let str = formatInput(s),
      stack = [],
      sign = "+",
      num = 0,
      i = 0,
      len = str.length;

  while(i < len) {
    // 对连续数字字符进行处理
    if (!isNaN(Number(s[i]))) {
      num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
    };


    
    i++;
  }
}
export {
  formatInput,
  calculate
}
// console.log(inputStr)
