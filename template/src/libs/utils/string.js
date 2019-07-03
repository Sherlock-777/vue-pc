/**
 * 通用函数库- 数字类函数
 *
 * currency 添加货币符号
 * substr 字符串截取，区分中英文字符
 */

/**
 * 添加货币符号
 * @param {String} val
 * @param {String} sign 货币符号,默认为￥
 * @returns {string}
 *
 * currency('100') => '￥100'
 */
export function currency (val, sign = '￥') {
  return `${sign}${val}`
}

/**
 * 字符串截取，区分中英文字符
 * @param {String} value 需要截取的字符串
 * @param {Number} start 起始位置 默认值为0,表示从第一个字符开始截取
 * @param {Number} length 截取长度 默认值为0 表示不截取
 *
 * substr('一个中文按两个字符长度算',0,10) => '一个中文按'
 */
export function substr (value, start = 0, length = 0) {
  if (value.replace(/[\u4e00-\u9fa5]/g, '**').length <= start) {
    return value
  }
  let sbstart = 0
  let sblength = 0
  let zlen = 0
  let curlen = 0
  for (let i = 0; i < value.length; i++) {
    if (/[\u4e00-\u9fa5]/.test(value[i])) {
      curlen = 2
    } else {
      curlen = 1
    }
    if (start > 0 && sbstart < start) {
      sbstart += curlen
      if (sbstart > start) {
        sbstart -= 1
      }
    } else {
      if (length === 0) {
        break
      } else {
        sblength += curlen
        zlen += 1
        if (sblength >= length) {
          break
        }
      }
    }
  }

  return length === 0 ? value.substr(sbstart) : value.substr(sbstart, zlen)
}

export default {
  currency,
  substr
}
