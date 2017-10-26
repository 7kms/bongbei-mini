import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        id:'',
        imagePrefix,
        totalPrice: 0,
        list: []
    },
    getOrder(id){
        $api({
            method:'GET',
            url:'/order/' + id,
            success:(data)=>{
               this.setData({
                   list: data.goods,
                   address: data.address,
                   totalPrice: data.totalPrice
               })
            },
            fail:()=>{

            }
        })
    },
    onLoad({id}){
        this.setData({id})
        wx.setNavigationBarTitle({
            title: '查看订单'
        });
        this.getOrder(id)
    },
    removeRemote(){
        let {id} = this.data;
        $api({
            method:'POST',
            url:'/order/remove',
            data:{
                ids:[id]
            },
            success:(data)=>{
                wx.showModal({
                    title: '提示',
                    content: '删除成功',
                    showCancle: false,
                    success:()=>{
                       wx.navigateBack()
                    }
                })
            },
            fail:()=>{

            }
        })
    },
    remove(){
        wx.showModal({
            title: '提示',
            content: '删除之后无法找回, 确认删除?',
            success: (res)=>{
                if(res.confirm){
                    this.removeRemote()
                }
            }
        })
    }
})