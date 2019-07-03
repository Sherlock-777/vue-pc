import http from './http'
import api from './api'
import utils from './utils'
import directive from './directive'
import filter from './filter'

const install = (Vue) => {
  Vue.prototype.$http = http
  Vue.prototype.$api = api
  Vue.prototype.$utils = utils

  Object.keys(directive).forEach(key => {
    Vue.directive(key, directive[key])
  })

  Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
  })
}

export default { install }
