// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';
import {decimalToNScale, nScaleToDecrimal} from "../utils/converNumScale";

function ConvertDecimal() {
  
  const [n, setN] = React.useState(2)
  const [num, setNum] = React.useState(0)
  const [result, setResult] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);

  const list = [2, 4, 8, 16, 32, 64];
  function handleConvert() {
    if(num === 0) {
      alert('请输入不等于0的数')
      return 
    }
    let numFn = decimalToNScale(n)
    // console.log(typeof num)
    setResult(numFn(num * 1))
  }
  function handleOrigin() {
    if(!result) {
      alert(`请先获取一个有效进制的数`)
      return 
    }
    let fn = nScaleToDecrimal(n)
    let ret = fn(`${result}`)
    setOrigin(ret)
  }
  return (
    <div>
      <div>
        <span style={{ marginRight:10, width: 300}}>选择进制:</span>
        <select name="" value={n} onChange={e =>setN(e.target.value)}>
        {
          list.map(item =>{
            return <option name={item} type="radio" value={item} >{item} 进制 </option> 
          })
        }
        </select>
      </div>
      <div style={{margin:'10px 0'}}>
        <span  style={{ marginRight:10}} >输入数值:</span>
        <input type="number" value={num} onChange={e =>setNum(e.target.value)} placeholder="输入待转换的数" />
      </div>
      <button onClick={() =>handleConvert()}>转换</button>
      <div style={{margin:'10px 0'}}>
        <span style={{ marginRight:10}} >返回结果:</span>
        <span>{result ? result: '...'}</span>
      </div>
      <button onClick={() =>handleOrigin()}>重回十进制</button>
      <div style={{margin:'10px 0'}}>
        <span style={{ marginRight:10}} >返回结果:</span>
        <span>{origin}</span>
      </div>
    </div>
  )
}

function App() {
  return <ConvertDecimal />
}

export default App
