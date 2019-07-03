/**
 * 通用函数库-校验类函数
 *
 * isNumber   校验数据类型是否为Number类型
 * isString   校验数据类型是否为String类型
 * isArray    校验数据类型是否为Array类型
 * isObject   校验数据类型是否为Obeject类型
 * isFunction 校验数据类型是否为Function类型
 * isBoolean  校验数据类型是否为isBoolean类型
 * isNull     校验数据类型是否为null
 */

/**
 * 校验数据类型是否为Number类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isNumber(1) =>  true
 * isNumber('1') => false
 */
export function isNumber (value) {
  return typeof value === 'number'
}

/**
 * 校验数据类型是否为String类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isString('a') => true
 * isString(1) => false
 */
export function isString (value) {
  return typeof value === 'string'
}

/**
 * 获取URL的query参数
 * @param (name, url) URL不传时为当前页面的URL
 * @returns value
 */
export function getQuery (name, url) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r
  if (url) {
    r = url
      .split('?')[1]
      .replace(new RegExp(/(amp;)/g), '')
      .match(reg)
  } else {
    r = window.location.search
      .substr(1)
      .replace(new RegExp(/(amp;)/g), '')
      .match(reg)
  }
  if (r != null) {
    return r[2]
  }
  return null
}

/*
 * flattenArr 数组扁平化
 * @param (arr)
 * @returns arr
 */
export const flattenArr = arr =>
  [].concat(...arr.map(item => (Array.isArray(item) ? flattenArr(item) : item)))

/*
  深度克隆对象  可克隆不可枚举属性
*/

export function cloneObjArr (target, type) {
  /* 判断传入type */
  if (!type || (type !== 'keys' && type !== 'getOwnPropertyNames')) {
    type = 'keys'
    console.log('type传参错误，已默认为keys 只能传keys和getOwnPropertyNames')
  }
  /* 设置获取目标类型的函数 */
  function getTargetClass (target) {
    return Object.prototype.toString.call(target).slice(8, -1)
  }
  // 1. 初始化变量，获取目标数据的类型
  let result
  let targetClass = getTargetClass(target)
  // 2. 判断目标的类型
  if (targetClass === 'Object') {
    // 对象
    result = {}
    let names = Object[type](target) // 获取对象下所有属性名（包括不可枚举属性），返回一个数组
    for (let i = 0; i < names.length; i++) {
      let pro = Object.getOwnPropertyDescriptor(target, names[i]) // 获取对象的自身属性描述符，返回一个对象
      if (
        getTargetClass(pro.value) === 'Object' ||
        getTargetClass(pro.value) === 'Array'
      ) {
        Object.defineProperty(result, names[i], {
          value: cloneObjArr(pro.value),
          writable: pro.writable,
          enumerable: pro.enumerable,
          configurable: pro.configurable
        })
      } else {
        Object.defineProperty(result, names[i], pro)
      }
    }
  } else if (targetClass === 'Array') {
    // 数组
    result = []
    for (let i = 0; i < target.length; i++) {
      if (
        getTargetClass(target[i]) === 'Object' ||
        getTargetClass(target[i]) === 'Array'
      ) {
        result[i] = cloneObjArr(target[i])
      } else {
        result[i] = target[i]
      }
    }
  } else {
    return target
  }
  return result
}

/*
_arr 数组格式化输出（用于连号数据的简化展示）
例子：
let arr = [1,2,3,5,7,8,9,11,12,14,16,18,19,20]
输出  1-3 , 5 , 7-9 , 11-12 , 14 , 16 , 18-20
*/
export const _arr = function (arr, needsort = false, needuniq = false) {
  if (needsort) {
    arr.sort(function (a, b) {
      return a - b // 排序 默认由小到大
    })
  }
  if (needuniq) arr = [...new Set(arr)] // 数组去重
  let str = ''
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1 && arr[i] !== arr[i + 1] - 1) {
      str += `-${arr[i]} ,`
    }
    if (arr[i] !== arr[i - 1] + 1 && arr[i] === arr[i + 1] - 1) {
      str += ` ${arr[i]}`
    }
    if (arr[i] !== arr[i - 1] + 1 && arr[i] !== arr[i + 1] - 1) {
      str += ` ${arr[i]} ,`
    }
  }
  str = str.slice(0, str.length - 1) // 去除末尾逗号
  return str
}

/*
  arrTo2转二维数组
  接收arr(原数组)length(二维数组中小数组的长度>0)，返回一个新的二维数组
  例子: let arr1 = [1,2,3,4,5,6,7,8,9]
        let arr2 = arrTo2(arr1,2) --> [[1,2],[3,4],[5,6],[7,8],[9]]
*/
export const arrTo2 = function (arr, length) {
  if (length <= 0) return [].concat(arr)
  let smallArr = []
  let bigArr = []
  for (let i = 0; i < arr.length; i++) {
    smallArr.push(arr[i])
    if (smallArr.length === length || i === arr.length - 1) {
      bigArr.push(smallArr)
      smallArr = []
    }
  }
  return bigArr
}

/*
  生成随机字符串
*/
export function randomStr (len) {
  len = len || 32
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
/*
 * 校验数据类型是否为Array类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isArray([]) => true
 * isArray('') => false
 */
export function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 校验数据类型是否为Object类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isObject({}) => true
 * isObject('') => false
 */
export function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 校验数据类型是否为Function类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isFunction(function(){}) => true
 * isFunction('') => false
 */
export function isFunction (value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}

/**
 * 校验数据类型是否为Boolean类型
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isBoolean(true) => true
 * isBoolean('true') => false
 */
export function isBoolean (value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

/**
 * 校验数据类型是否为null
 * @param {any} value 需要校验的数据
 * @returns {Boolean}
 *
 * isNull(null) => true
 * isNull({}) => false
 */
export function isNull (value) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined'
  )
}

/**
 * 判断访问终端
 * @returns {Object} versions {
 *   trident: E内核
 *   presto: opera内核
 *   webKit: 苹果、谷歌内核
 *   gecko: 火狐内核
 *   mobile: 是否为移动终端
 *   ios: ios终端
 *   android: android终端
 *   iPhone: 是否为iPhone或者QQHD浏览器
 *   iPad: 是否iPad
 *   webApp: 是否web应该程序，没有头部与底部
 *   weixin: 是否微信
 *   qq: 是否QQ
 * }
 * @returns {String} language 语言
 *
 * browser.versions.mobile => true:移动终端
 * browser.versions.trident => true:IE内核
 * browser.language => zh-cn:中文
 */
export const browser = {
  versions: (function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') === -1,
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.match(/\sQQ/i) === 'qq'
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
export default {
  isNumber,
  isString,
  isArray,
  isObject,
  isFunction,
  isBoolean,
  isNull,
  browser,
  getQuery,
  flattenArr,
  cloneObjArr,
  randomStr
}
