<template>
  <div class="hello">
    <h1>DEMO</h1>
    <el-button type="button"
               @click="handleGet">Get</el-button>
    <el-button type="button"
               @click="handlePost">Post</el-button>
    <el-button type="button"
               @click="handleAjax">Post</el-button>
    <el-button type="button"
               @click="handleMock">Mock</el-button>
    <el-button type="button"
               @click="handleApiTest">Api</el-button>
    <div><a href="">test scss</a></div>
    <div>{{count}}</div>
    <div>
      <el-button type="button"
                 @click="handleState">vuex1</el-button>
    </div>
    <div>{{todo}}</div>
    <div>
      <el-button type="button"
                 @click="handleUserLogin">vuex-action</el-button>
    </div>
    <div>${{price}}</div>
    <div>
      <el-button type="button"
                 @click="handAddShop">vuex-modules-namespace</el-button>
    </div>
    <div>{{new Date() | formatDate() }}</div>
    <div>{{'123456789' | currency}}</div>
    <div>{{12345678 | formatThousands(2)|currency}}</div>
    <div v-html="$options.filters.formatThousands(123,2,'em')"></div>
    <div>{{'2018-12-12' | diffDate('2018-12-01')}}</div>
    <div>{{new Date()| addDays(-2) | formatDate}}</div>
    <div>{{msg | substr(0,15)}}</div>
    <div>{{str1 | substr(0,15)}}</div>
    <input type="text"
           v-focus>
    <!-- 自己定义组件引用 -->
    <hellow-vue></hellow-vue>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      str1: '我是中国人abcdef12345,.'
    }
  },
  computed: {
    count: function () {
      return this.$store.state.count
    },
    todo () {
      return this.$store.getters.doneTodos
    },
    ...mapState({
      price: state => state.cart.price
    })

  },
  created () {

  },
  methods: {
    async handleGet () {
      let res = await this.$http.get('https://www.easy-mock.com/mock/5a4f34d2d344f80dfbed880c/test/v2/user/login', { name: 'admin' })
      console.log(res)
    },
    async handlePost () {
      let res = await this.$http.post('https://www.easy-mock.com/mock/5a4f34d2d344f80dfbed880c/test/v2/user',
        { name: 'admin', age: 33 }
      )
      console.log(res)
    },
    async handleAjax () {
      let res = await this.$http.ajax({
        url: 'https://www.easy-mock.com/mock/5a4f34d2d344f80dfbed880c/test/v2/user/createWithList',
        method: 'post',
        data: { name: 'admin' }
      })
      console.log(res)
    },
    async handleMock () {
      let res = await this.$http.get('/invoice/abandonInvoiceByNo', {})
      console.log(res)
    },
    async handleApiTest () {
      let res = await this.$api.auth.login({ name: 'admin', pass: '123456' }, {
        loading: ''
      })
      console.log(res)
    },
    handleState () {
      this.$store.commit('increment')
    },
    handleUserLogin () {
      this.$store.dispatch('userLogin')
    },
    handAddShop () {
      let shopList = [
        {
          'id': 2,
          'name': 'tt',
          price: 10.00
        },
        {
          'id': 3,
          'name': 'rr',
          price: 20.00
        }
      ]
      this.addShop(shopList)
      this.calculatePrice()
    },
    ...mapActions('cart', [
      'calculatePrice'
    ]),
    ...mapMutations('cart', {
      addShop: 'addShop'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./index.scss"></style>
