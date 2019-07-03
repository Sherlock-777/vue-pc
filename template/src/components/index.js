import HellowVue from './hellow-vue'

const components = [
  HellowVue
]

export default {
  install (Vue) {
    components.map(component => Vue.component(component.name, component))
  }
}
