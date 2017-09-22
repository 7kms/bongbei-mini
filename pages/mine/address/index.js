import { $api } from '../../../utils/api'

Page({
    data:{
        hiddenLoading: false,
        list: []
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: '管理收货地址'
        })
        var _this = this;
        $api({
            method:'GET',
            url:'/user/address',
            data: {},
            success: function(data){
                console.log(data)
                _this.setData({
                    loading: false,
                    list: data.list
                })
            },
            fail: function(){
                _this.setData({
                    loading: false
                })
            }
        })
    }
})