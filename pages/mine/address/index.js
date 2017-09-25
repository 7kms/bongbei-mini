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
                _this.setData({
                    hiddenLoading: true,
                    list: data.list
                })
            },
            fail: function(e){
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
    remove(e){
        let {index} = e.currentTarget.dataset;
        let list = this.data.list;
        list = list.filter((item,i)=>{
            return index != i
        })
        this.setData({
            list
        })
    },
    edit(e){
        let { index } = e.currentTarget.dataset;
        let list = this.data.list;
        let isDefault = list[index].isDefault
        this.choseAddress((address)=>{
            list[index] = address;
            list[index].isDefault = isDefault;
            this.setData({
                list
            })
        })
    },
    addAddress(){
        let list = this.data.list;
        this.choseAddress((address)=>{
            list.push(address)
            this.setData({
                list
            })
        })
    },
    choseAddress(callback){
        wx.chooseAddress({
            success(address){
                delete address.errMsg
                address.isDefault = false
                callback && callback(address)
            },
            fail(err){
                console.log(err)
            }
        })
    },
    changeRemoteAddress(){
        var _this = this;
        this.setData({
            lodingText: '提交中',
            hiddenLoading: false
        })
        let address = this.data.list
        $api({
            method:'POST',
            url:'/user/address',
            data: {
                address
            },
            success: function(data){
                _this.setData({
                    hiddenLoading: true
                })
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1500
                  })
                setTimeout(wx.navigateBack, 1500);
            },
            fail: function(){
                _this.setData({
                    hiddenLoading: true
                })
            }
        })
    }
})