import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix,
        list: []
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: '我的订单'
        })
        $api({
            method:'GET',
            url:'/order',
            success:(data)=>{
               this.setData({
                   list: data
               })
            },
            fail:()=>{

            }
        })
    }
})