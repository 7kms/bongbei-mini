var $api = require('./utils/api').$api

//app.js
App({
  onLaunch: function() {
    var _this = this
    wx.login({
      success: function(res) {
        let code = res.code;
        _this.getUserInfo(function(res){
          // res.code = code
          let {encryptedData,iv} = res
          $api({
            method: 'POST',
            url:'/user/onlogin',
            data:{
              code,encryptedData,iv
            },
            success:function(res){
              console.log(res)
              _this.getUserInfo()
            },
            fail: function(err){
              console.log(err)
            }
          })
        })
      }
    });
  },

  getUserInfo: function(cb) {
    //调用登录接口
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log(res)
        // that.globalData.userInfo = res.userInfo
        typeof cb == "function" && cb(res)
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
