import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        id:'',
        loading: true,
        imagePrefix,
        totalPrice: 0,
        paid: false,
        list: []
    },
    getOrder(id){
        $api({
            method:'GET',
            url:'/order/' + id,
            success:(data)=>{
               this.setData({
                   loading:false,
                   list: data.goods,
                   address: data.address,
                   totalPrice: data.totalPrice,
                   paid: data.paid
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
    payagain(){
        let {id} = this.data;
        $api({
            method:'POST',
            url:'/order/payagain',
            success:(data)=>{
                
            },
            fail:()=>{

            }
        })
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