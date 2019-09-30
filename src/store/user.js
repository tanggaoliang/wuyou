import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import API from '../service/request'

 const userStore = observable({
  user: {},
  isLogin() {
    return Taro.getStorageSync('user').id > 0
  },
  updateUser() {
    API.get(`user/getuserinfo?user_id=${Taro.getStorageSync('user').id}`).then(res => {
      if (res.code == 1) {
        Taro.setStorageSync('user', res.data)
        this.user = res.data
      }
    })
  },
  getUser() {
    this.user = Taro.getStorageSync('user')
  },
  checkLogin() {
    if (!Taro.getStorageSync('user') || !Taro.getStorageSync('user').id) {
      Taro.showToast({
        title: '请登陆后操作',
        icon: 'none'
      })
      return false
    }
    return true
  },
  needLogin(router){
    const {path,params}=router
    if(!Taro.getStorageSync('user').id){
      Taro.navigateTo({url: `/pages/auth/index?from=${path}&params=${JSON.stringify(params)}`})
    }else{
      this.getUser()
    }
  },
  setUser(user){
    this.user=user
    Taro.setStorageSync('user',user)
  },
  logout(){
    this.user={}
    Taro.removeStorageSync('user')
  }
})
export default userStore