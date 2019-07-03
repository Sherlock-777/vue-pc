
const state = {
  price: 12.00,
  shopList: []
}

const getters = {
  countShop: state => {
    return state.shopList.length
  }
}

const actions = {
  calculatePrice ({ commit, state }) {
    let price = 0
    for (let item of state.shopList) {
      price += item.price
    }
    commit('updatePrice', price)
  }
}

const mutations = {
  addShop (state, shopList) {
    state.shopList = shopList
  },
  updatePrice (state, price) {
    state.price = price
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
