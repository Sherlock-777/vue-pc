
/**
 * 存储localStorage
 */
export const mangSession = (name, content) => {
  return manageSave(name, content, false)
}

/**
 * 存储localStorage
 */
export const mangLocal = (name, content) => {
  return manageSave(name, content)
}
/**
 * 管理Storage
 */
export const manageSave = (name, content, type = true) => {
  let storage = type ? localStorage : sessionStorage
  let isLocal = (window.localStorage && window.localStorage && window.localStorage instanceof Storage)
  // let isLocal = false
  if (typeof name === 'string') {
    if (!content && typeof content != 'boolean') {
      let data = isLocal ? storage.getItem(name) : getCookie(name)
      try {
        let eightVal = DeEight(data)
        if (typeof eightVal == 'string') {
          data = eightVal
        }
      } catch (e) {
      }
      try {
        data = JSON.parse(data)
      } catch (e) {
      }
      return data
    } else if (content && (Object.prototype.toString.call(content) === '[object Object]' || Object.prototype.toString.call(content) === '[object Array]')) {
      content = JSON.stringify(content)
      if (isLocal) {
        storage.setItem(name, EnEight(content))
      } else {
        setCookie(name, content)
      }
    } else if (content && Object.prototype.toString.call(content) === '[object Boolean]') {
      content = JSON.stringify(content)
      if (isLocal) {
        storage.setItem(name, content)
      } else {
        setCookie(name, content)
      }
    } else if (typeof content === 'string' && content === 'del') {
      storage.removeItem(name)
    } else {
      if (isLocal) {
        storage.setItem(name, content)
      } else {
        setCookie(name, content)
      }
    }
  } else if (Object.prototype.toString.call(name) === '[object Object]') {
    if (isLocal) {
      storage.setItem(name, content)
    } else {
      setCookie(name, content)
    }
  }
  return true
}


export const getCookie = (name) => { //匹配字段
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"), res, r;
  if (arr = document.cookie.match(reg)) {
    r = decodeURIComponent(arr[2]);
    try {
      res = JSON.parse(decodeURIComponent(arr[2]));
    } catch (e) {
    }
    return res ? res : r;
  }
  return r
}

export const setCookie = (name, value) => {
  try {
    //定义一天
    var days = 1;
    var exp = new Date();
    //定义的失效时间，
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    if (Object.prototype.toString.call(value) == '[object Object]') {
      value = JSON.stringify(value);
    }
    //写入Cookie  ，toGMTstring将时间转换成字符串。
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
  } catch (e) {
    alert('系统异常，请联系管理员！')
  }
}


/**
 * 8进制加密
 */
export const EnEight = o => {
  var monyer = new Array();
  try {
    var i
    for (i = 0; i < o.length; i++)
      monyer += "\\" + o.charCodeAt(i).toString(8)
    return monyer
  } catch (e) {
    return o
  }
}

/**
 * 8进制解密
 */
export const DeEight = (o) => {
  try {
    var monyer = new Array();
    var i;
    var s = o.split("\\");
    for (i = 1; i < s.length; i++)
      monyer += String.fromCharCode(parseInt(s[i], 8));
    return monyer
  } catch (e) {
    return o
  }
}


export default {
  mangSession,
  mangLocal,
  getCookie,
  setCookie,
  EnEight,
  DeEight
}