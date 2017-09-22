import { $api } from '../../../utils/api'

Page({
    data:{
        hiddenLoading: false,
        lodingText: '正在加载...',
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
                    hiddenLoading: true,
                    list: data.list
                })
            },
            fail: function(){
                _this.setData({
                    hiddenLoading: true
                })
            }
        })
    },
    setDefault(e){
        let {index} = e.currentTarget.dataset;
        let list = this.data.list

        list.forEach((item,i)=>{
            if(index == i){
                item.isDefault = true
            }else{
                item.isDefault = false
            }
        })
        this.setData({
            list
        })
        console.log(this.data.list)
    },
    choseAddress(){
        wx.chooseAddress({
            success(address){
                delete address.errMsg
            },
            fail(err){
                console.log(err)
            }
        })
    },
    changeRemoteAddress(address){
        var _this = this;
        this.setData({
            lodingText: '提交中'
        })
        $api({
            method:'POST',
            url:'/user/address',
            data: {
                address
            },
            success: function(data){
                console.log(data)
                _this.setData({
                    hiddenLoading: true,
                    list: data.list
                })
            },
            fail: function(){
                _this.setData({
                    hiddenLoading: true
                })
            },
            complete: function(){

            }
        })
    }
})