import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function generateDataUrl(file) {
  let src;
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    src = reader.result;
  }, false);
  reader.readAsDataURL(file);
  return src
}
function useFileReader(file) {
  const [dataUrl, setDataUrl] = useState(null)

  useEffect(() =>{
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      setDataUrl(reader.result);
    }, false);
    if (file) {
      console.log('file', file)
      reader.readAsDataURL(file);
    }
    return () =>{
      // reader.
    }
  }, [file])

  return dataUrl
}
function GrayImage() {

  const [src, setSrc] = useState(null)

  const [file, setFile] = useState(null)


  const dataUrl = useFileReader(file);

  const handleUploadImage = async (e) =>{
    let fileTemp =  e.target.files[0];
    if (!/image\/\w+/.test(fileTemp.type)) {
      alert("文件必须为图片！");
      return false;
    }
    setFile(fileTemp)
  }

  return (
    <>
      <div>
        <span>上传图片:</span>
        <input type="file" onChange={(e) =>handleUploadImage(e)}  />
      </div>
      <div>
        <span>图片预览:</span>
      </div>
      <div>
        <span>图片灰度化:</span>
      </div>
    </>
  )

}

function App() {
  return <GrayImage />
}

export default App
