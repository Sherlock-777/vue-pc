import Mock from 'mockjs'

/**
 * 用户登录
 */
Mock.mock(/\/auth\/login([?.#&].*)?$/, function (options) {
  return {
    code: 1,
    message: '登录成功!',
    result: { id: 1, realName: 'admin' }
  }
})
