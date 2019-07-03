import querstring from 'querystring'
/**
 * 通用函数库- 清空对象空值类函数
 *
 * deleteObjectEmptyValue 删除对象空值
 * arrSort 数组排序
 * citySort 城市按照字母排序
 * capitalizationRMB 人民币转换为大写
 * checkTel 校验手机号码
 * changDataType 数据格式装换
 */

/**
 *  删除对象空值
 * @param {object} obj
 * 例子：let obj={a:1,b:null,c:''}
 * deleteObjectEmptyValue(obj)=>{a:1}
 */
export function deleteObjectEmptyValue (obj) {
  let newObj = {}
  for (var item in obj) {
    if (obj[item]) {
      newObj[item] = obj[item]
    }
  }
  return newObj
}

/**
 *  数组排序
 * @param {object} arr
 *
 * 例子：let arr=[45,12,34,3,5,1,2,2,9,8,7]
 * arrSort(arr)=>  [1,2,2,3,5,7,8,9,12,34,45]
 *
 */
export function arrSort (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        var b = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = b
      }
    }
  }
  return arr
}
/**
 *  城市按照字母排序
 * @param {object} arr
 *
 * 例子：let arr=[{
 * id:1,
 * cityLetter:'B',
 * cityName:'保定'
 },
 {
*id:2,
*cityLetter:'a',
*cityName:'安化'
*},{
*id:3,
*cityLetter:'B',
*cityName:'北京'
* }]

 * citySort(arr)=> {
 * 'A':[{
 * id:2,
 * cityLetter:'a',
 * cityName:'安化'
 * }],
 * 'B':[{
 * id:1,
 * cityLetter:'B',
 * cityName:'保定'
 * },{
 * id:3,
 * cityLetter:'B',
 * cityName:'北京'
 * }]
 * }
 *
 */
export function citySort (arr) {
  let obj = {}
  let letterArr = []
  arr.forEach((item, index) => {
    let toUpperCaseLetter = item.cityLetter.toUpperCase()
    if (!obj[toUpperCaseLetter]) {
      obj[toUpperCaseLetter] = []
    }
    obj[toUpperCaseLetter].push(item)
  })
  for (var item in obj) {
    letterArr.push(item)
  }
  letterArr.sort()
  let newObj = {}
  letterArr.forEach((item) => {
    newObj[item] = obj[item]
  })
  return newObj
}

/**
 *  人民币转换为大写
 * @param {string} n
 *
 * 例子：let n=101245.456=>壹拾万壹仟贰佰肆拾伍元肆角伍分
 */
export function capitalizationRMB (n) {
  var fraction = ['角', '分']
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  var s = ''

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (var k = 0; k < unit[0].length && n > 0; k++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][k] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}
/**
 *  校验手机号码
 * @param {string} tel
 * 例子：let tel=1 5673 421235 =>15673421235
 *      let tel='' =>'手机号不能为空'
 *      let tel=1 5673 42123 =>'手机号码格式不正确'
 */
export function checkTel (tel) {
  let reg = /^1[356789]\d{9}$/
  let errorObj = {
    'isCorrent': false,
    'tel': tel,
    'mesg': '手机号不能为空'
  }
  if (!tel) { return errorObj }
  tel = tel.replace(/\s/g, '')
  errorObj.tel = tel
  if (!reg.test(tel)) {
    errorObj.mesg = '手机号码格式不正确'
    return errorObj
  } else {
    errorObj.isCorrent = true
    errorObj.mesg = '手机号码正确'

    return errorObj
  }
}
/**
 *  数据格式装换
 * @param {object} params
 * 例子：let params={name: '张三',tel: '15673143218',isFormUrlencoded:true}=>name='张三'&tel='15673143218'
 * 例子：let params={name: '张三',tel: '15673143218',isJsonData:true}=>"{name: '张三',tel: '15673143218'}"
 * 例子：let params={name: '张三',tel: '15673143218',isFormData:true}=>name='张三'&tel='15673143218'
 */
export function changDataType (params) {
  if (params.isFormUrlencoded) { // 请求数据格式为'Content-Type': 'application/x-www-form-urlencoded'
    delete params.isFormUrlencoded
    params = querstring.stringify(params) // 将对象转换为键值对
  }
  if (params.isJsonData) { // 请求数据格式为'Content-Type': 'application/json'
    delete params.isJsonData
    params = JSON.stringify(params) // 将json对象转换为json字符串
  }
  if (params.isFormData) { // 请求数据格式为'Content-Type': 'multipart/form-data'
    delete params.isFormData
    let formData = new FormData()
    for (var key in params) {
      formData.append(key, params[key])
    }
    params = formData
  }
  return params
}
export default {
  deleteObjectEmptyValue,
  arrSort,
  citySort,
  capitalizationRMB,
  checkTel,
  changDataType
}
