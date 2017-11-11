import { $api } from './utils/api'
import { fetchUserInfo, login} from './utils/index'

//app.js
App({
  onLaunch: function() {
    fetchUserInfo(function(user){
      
    },function(){
      login()
    })
  },
  onShow(){
    wx.removeStorageSync('product-cache')
    // wx.setStorageSync('orderList', orderList)
  },
  globalData:{

  }
})
