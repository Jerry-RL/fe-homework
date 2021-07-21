// 实现 lodash.get('')

function getValueByPath(data, path, defaultValue=null) {
  let keys = [];
  if(Array.isArray(path)) {
    keys = path
  } else {
    keys = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
  }
  return keys.reduce((pre, curr) =>{
    return (pre || {})[curr]
  }, data) || defaultValue
}


const reg = /\{\{(.*?)\}\}/gm


function render(str, data) {
  let html = str.replace(reg, (match, path) =>{
    return getValueByPath(data, path.trim())
  })
  return html
}

export {
  render
}