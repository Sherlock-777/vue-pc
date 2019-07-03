/**
 * 通用函数库- 数字类函数
 *
 * formatThousands 格式化数字为123,456,789
 */

/**
 * 格式化数字为123,456,789
 * @param  {Number} number  需要格式化的数字
 * @param  {Number} decimal 允许的小数位数
 * @param  {String} decimal 小数是否使用指定标签
 * @return {String}
 *
 * formatThousands(10000.00) => '10,100.00'
 * formatThousands(10000.001,2,'em') => '10,100.<em>00</em>'
 * 特别使用方法：由于输出了html标签，但vue不会解析标签，可使用如下方法使用
 * <div v-html="formatThousands(money,2,'em')"></div>
 */
export function formatThousands (number, decimal = 2, deciTag = '') {
  if (number && !isNaN(number)) {
    number = parseFloat(number).toFixed(decimal)
    number = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return deciTag
    ? number.toString().replace(/\.(\d{2})$/, `.<${deciTag}>$1</${deciTag}>`)
    : number
}

export default {
  formatThousands
}
