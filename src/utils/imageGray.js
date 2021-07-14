let fnMap = {
  //浮点算法
  float: (R, G, B) => R * 0.299 + G * 0.587 + B * 0.114,
  //整数算法
  int: (R, G, B) => (R * 299 + G * 587 + B * 114 + 500) / 1000,
  //平均值算法
  ave: (R, G, B) => (R + G + B) / 3,
  //仅取绿色
  green: (R, G, B) => G,
};


function convert256toGray(imgData, key = 'float') {

  let fn = fnMap[key];

  // let imgData = JSON.parse(JSON.stringify(imageData));

  for (var i = 0; i < imgData.data.length; i += 4) {
    var R = imgData.data[i]; //R(0-255)
    var G = imgData.data[i + 1]; //G(0-255)
    var B = imgData.data[i + 2]; //B(0-255)
    var Alpha = imgData.data[i + 3]; //Alpha(0-255)

    let gray = fn(R, G, B);
   
    imgData.data[i] = gray;
    imgData.data[i + 1] = gray;
    imgData.data[i + 2] = gray;
    imgData.data[i + 3] = Alpha;
  }
  return imgData
}
function downloadCanvas(current, filename) {
  try {
    let link = document.createElement('a')
    link.href = current.toDataURL();
    link.download = filename;
    link.click()
  } catch (error) { 
    console.error(error)
  }
}
export {
 convert256toGray,
 downloadCanvas
}