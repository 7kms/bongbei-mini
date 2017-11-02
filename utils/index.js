import { $api } from './api';

let fetchUserInfo = function(success,err){
    $api({
        method:'GET',
        url: '/user',
        success: function(data){
            wx.setStorageSync('userInfo',data)
            success(data)
        },
        fail:function(){
            wx.removeStorageSync('userInfo')
            err && err()
        }
    })
}

let getUserInfo = function(success,err){
    try {
        var value = wx.getStorageSync('userInfo')
        if (value) {
            success(value)
        }else{
            fetchUserInfo(success,err)
        }
    } catch (e) {
        err && err()
    }
}

let register = function(code){
    //调用登录接口
    wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
            // res.code = code
            let {encryptedData,iv} = res
            $api({
              method: 'POST',
              url:'/user/onlogin',
              data:{
                code,encryptedData,iv
              },
              success:function(res){
                wx.setStorageSync('userInfo',res.data)
              },
              fail: function(err){
                wx.removeStorageSync('userInfo')
                console.log(err)
              }
            })
        }
      })
}

let login = function(){
    wx.login({
        success: function(res) {
          let code = res.code;
          register(code)
        }
    });
}
let sharePage = (obj)=>{
    if(!obj.onShareAppMessage){
        obj.onShareAppMessage = ()=>{
            return {
                title: '卷趣烘焙 | 甜品',
                path: '/pages/product/list/index',
                success: function(res) {
                  // 转发成功
                },
                fail: function(res) {
                  // 转发失败
                }
            }
        }
    }
    return obj;
}
export {
    fetchUserInfo,
    getUserInfo,
    login,
    sharePage
}