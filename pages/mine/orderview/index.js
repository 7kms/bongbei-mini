import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        id:'',
        loading: true,
        imagePrefix,
        totalPrice: 0,
        paid: false,
        list: [],
        promotion:{enable:false}
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
                   paid: data.paid,
                   promotion: data.promotion
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
            url:'/order/payagain/'+id,
            success:(data)=>{
                let obj = Object.assign({
                    'success':function(res){
                        wx.showModal({
                            title: '提示',
                            content: '支付成功',
                            showCancel: false,
                            success:()=>{
                                wx.redirectTo({
                                    url: '/pages/mine/orderlist/index'
                                })
                            }
                        });
                    },
                    'fail':function(res){
                        wx.showModal({
                            title: '提示',
                            content: '取消支付',
                            showCancel: false,
                            success:()=>{}
                        });
                    }
                },data)
                wx.requestPayment(obj)
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