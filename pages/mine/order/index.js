import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        list:[]
    },
    getDefaultAddress(){
        $api({
            method:'GET',
            url:'/user/address',
            success:(res)=>{
                console.log(res)
            },
            fail:()=>{
                
            }
        })
    },
    onLoad(){
        this.getDefaultAddress()
        let orderList = wx.getStorageSync('orderList')
        wx.removeStorage({key:'orderList'})
        this.setData({
            list: orderList
        })
    }
})