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
        
    },
    onShow(){
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
    },
    goDetail(e){
        let {id} = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/mine/orderview/index?id=${id}`
        });
    }
})