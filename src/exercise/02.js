import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { convert256toGray, downloadCanvas } from "../utils/imageGray";

function useFileReader(file) {
  const [dataUrl, setDataUrl] = useState(null);


  useEffect(() =>{
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      setDataUrl(reader.result);
    }, false);
    reader.addEventListener("error", function (error) {
  
      setDataUrl(null)
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
    return () =>{
      reader = null;
    }
  }, [file]);
  return dataUrl
}

let methods =['float', 'int', 'ave', 'green']
function GrayImage() {

  const [file, setFile] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [graied, setGraied] = useState(false);
  const ref = React.useRef();
  const imgRef = React.useRef(); 

  const [method, setMethod] = useState('float');
  const dataUrl = useFileReader(file);

  const handleUploadImage = (e) =>{
    let fileTemp =  e.target.files[0];
  
    if (!/image\/\w+/.test(fileTemp.type)) {
      alert("文件必须为图片！");
      return false;
    }
    console.log(fileTemp)
    setFile(fileTemp)
  }
  const handleGrayImage = () =>{
    let ctx = ref.current.getContext("2d");
    if(!dataUrl) {
      alert('上传图片')
      return
    }
    let imgData = ctx.getImageData(0, 0, 300, 200);
    let grayData = convert256toGray(imgData, method)
    ctx.putImageData(grayData, 0, 0);
    setGraied(true)
  }
  const handleDownloadGrayImage = () =>{
    if(!dataUrl) {
      alert('上传图片');
      return
    }
    if(!graied) {
      alert('将图片灰度');
      return
    }
    downloadCanvas(ref.current, `${method}-gray-${file.name}`);
  }
  useEffect(() =>{
    if(dataUrl) {
      let height = getComputedStyle(imgRef.current).height.replace('px', '') * 1;
      setCanvasHeight(height)
      ref.current.getContext("2d").drawImage(imgRef.current, 0, 0, 300, height);
    }

  }, [dataUrl])
  return (
    <div>
      <div>
        <span style={{marginRight: 10}}>上传图片:</span>
        <input type="file" onChange={(e) =>handleUploadImage(e)}  />
      </div>
      <div style={{margin: "10px 0"}}>
        <span style={{marginRight: 10}}>图片预览:</span>
        {dataUrl && <img alt="demo" ref={imgRef} src={dataUrl} style={{width: 300}} />}
      </div>
      <div>
        <select value={method} onChange={e =>setMethod(e.target.value)}>
          {
            methods.map(item =>{
              return <option key={item} name={item} type="radio" value={item} >{item} 算法</option> 
            })
          }
        </select>
        <button onClick={() =>handleGrayImage()}>点击灰度</button>
      </div>
      <div style={{margin: "10px 0"}}>
        <span style={{marginRight: 10}}>图片灰度:</span>
        <canvas ref={ref} style={{width: 300, height: canvasHeight}}>
          
        </canvas>
      </div>
      <div>
        <button onClick={() =>handleDownloadGrayImage()}>下载灰度图</button>
      </div>
    </div>
  )

}

function App() {
  return <GrayImage />
}

export default App
