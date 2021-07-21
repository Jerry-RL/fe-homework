// 实现 lodash.get('')

function getValueByPath(data, path) {
  let keys = [];
  if(Array.isArray(path)) {
    keys = path
  } else {
    keys = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
  }
  return keys.reduce((pre, curr) =>{
    return (pre || {})[curr]
  }, data)
}


const reg = /\{\{(.*?)\}\}/gm

function parseStringToHTML(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html"); 
  return [...doc.body.children];
}

function isShow(el, data) {
  let key = el.getAttribute('v-if')
  if(key) {
    let bool = getValueByPath(data, key)
    if(bool === false) {
      el.style.display = 'none'
    }
  }
  
}
function forEachEl(tags, data) {
  [...tags].forEach(item =>{
    isShow(item, data)
    if([...item.children].length !== 0) {
      forEachEl([...item.children], data)
    }
  })
}
function render(str, data) {
  let html = str.replace(reg, (match, path) =>{
    return getValueByPath(data, path.trim())
  })
  let tags = parseStringToHTML(html)
  forEachEl(tags, data)
  let fg = document.createDocumentFragment()
  tags.forEach(item =>{
    fg.appendChild(item)
  })
  return fg
}
// test
// render('<div><span>{{a}}</span><span v-if="b.c">c</span><span v-if="b.d">d</span></div>', {a: 1, b:{c:true, d: false}})

export {
  render
}