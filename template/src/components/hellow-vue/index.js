import HellowVue from './src/main'

HellowVue.install = (Vue) => {
  Vue.component(HellowVue.name, HellowVue)
}

export default HellowVue
