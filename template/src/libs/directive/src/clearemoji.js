/**
 *  emoji
 */
export default {
  bind (el, binding, vNode) {
    el.addEventListener('keyup', function () {
      var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|\uA9|\uAE|\u3030/ig
      setTimeout(function () {
        el.value = el.value.replace(regStr, '')
      }, 20)
    }, false)
  }
}
