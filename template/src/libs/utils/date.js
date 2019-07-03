/**
 * 通用函数库-日期操作类函数
 *
 * formatDate 将 Date 转化为指定格式的String
 * diffDate 计算两个日期相差天数
 * addDays 日期增加或减少天数
 */

/**
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {Date} date 需要格式化的日期对象
 * @param {String} format 需要的格式字符串模型
 * @returns {String}
 *
 * formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * formatDate(new Date(),'yyyy/M/d h:m:s.S')      ==> 2006/7/2 8:9:4.18
 */
export function formatDate (date, format = 'yyyy-MM-dd') {
  const d = new Date(date)

  var o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

/**
 * 计算两个日期相差天数
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 *
 * diffDate('2018-12-01','2018-12-02') => 1
 */
export function diffDate (date1, date2) {
  var Data1 = new Date(date1)
  var Data2 = new Date(date2)
  var diff = Math.abs(Data1.getTime() - Data2.getTime())
  var ret = Math.floor(diff / (24 * 60 * 60 * 1000))
  return ret
}

/**
 * 日期增加或减少天数
 * @param {Date} date 日期
 * @param {Number} day 需要添加的天数 为负数时减少天数
 * @returns {Date}
 *
 * addDays('2018-12-01',1) => 2018-12-02 (日期型)
 */
export function addDays (date, day) {
  let now = new Date(date)
  now.setDate(now.getDate() + day)
  return now
}

/**
 * 根据日期获取发布时间
 * @param {Date} date 日期
 * @returns {String}
 *
 * getDateDiff('2018-12-01') => 3周前
 */
export function getDateDiff (date) {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  var result = ''
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var time = new Date(date).getTime()
  var diffValue = now - time
  if (diffValue < 0) return ''
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

export default {
  formatDate,
  diffDate,
  addDays,
  getDateDiff
}
