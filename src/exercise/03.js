// import { useState } from "react";
import { useState, useRef } from "react"
import { calculate, formatInput } from "../utils/stringCalculate";

function StringCalculate() {
  const inputRef = useRef();

  const [result, setResult] = useState(null);
  const [evalResult, setEvalResult] = useState(null);

  function handleCalculate() {
    let val = inputRef.current.value;
    let ret = calculate(val);
    
    setResult(ret)
  }
  return <div>
    <div className="">
      <span>输入:</span>
      <input defaultValue={'f()'} ref={inputRef} />
    </div>
    <button onClick={() =>handleCalculate()}>执行函数</button>
    <div>
      <span>结果:</span> {result ? <span>{result}</span> : '...'}
    </div>
    <button>执行eval</button>
    <div><span>结果:</span> {evalResult ? <span>{evalResult}</span> : '...'}</div>
  </div>
}
function App() {
  return <StringCalculate />
}

export default App