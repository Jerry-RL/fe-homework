function formatInput(str) {
  let reg = /^f\((.*?)\)$/
  try {
    let retStr = str.replace(/\s/g, '').match(reg)[1]
    eval(retStr)
    if(!retStr) throw new Error('输入不合法')
    return retStr
  } catch (error) {
    console.log(error)
  }
}

//
function execOperation(numStack, opStack) {
  let num1 = numStack.pop(),
    num2 = numStack.pop()
  let opt = opStack.pop()
  let fnMap = {
    '+': (a, b) => {
      numStack.push(a + b)
    },
    '-': (a, b) => {
      numStack.push(a - b)
    },
    '*': (a, b) => {
      numStack.push(a * b)
    },
    '/': (a, b) => {
      numStack.push(a / b)
    },
  }
  // 左右括号不做操作
  fnMap[opt] && fnMap[opt](num1, num2)
}

function calculate(input) {

  // 字符串处理
  let str = formatInput(input);

  let numStack = [],
    opStack = [];

  // 操作符优先级
  let signMap = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  let i = 0,
    len = str.length;

  while (i < len) {
    if (!isNaN(Number(str.charAt(i)))) {
      let num = 0
      while (i < len && !isNaN(Number(str.charAt(i)))) {
        num = num * 10 + Number(str.charAt(i++))
      }
      // 数字入栈
      numStack.push(num)
      i--
    } else if (str.charAt(i) === '(') {
      opStack.push('(')
    } else if (str.charAt(i) === ')') {
      while (opStack.length !== 0 && opStack[opStack.length - 1] !== '(') {
        execOperation(numStack, opStack)
      }
      // 直到遇到"）"出栈
      opStack.pop()
    } else {
      while (
        opStack.length !== 0 &&
        opStack[opStack.length - 1] !== '(' &&
        signMap[opStack[opStack.length - 1]] > signMap[str.charAt(i)]
      ) {
        execOperation(numStack, opStack)
      }
      opStack.push(str.charAt(i))
    }
    i++
  }
  while (opStack.length !== 0) {
    execOperation(numStack, opStack)
  }
  return numStack.pop()
}

export {formatInput, calculate}

