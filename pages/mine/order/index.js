import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix,
        totalPrice: 0,
        list: [],
        promotion:{enable:false}
    },
    initial(){
        this.getDefaultAddress();
        this.getPromotion();
    },
    getDefaultAddress(){
        $api({
            method:'GET',
            url:'/user/address',
            success:({list})=>{
               let address = list.filter(item=>item.isDefault)[0];
               if(address){
                   this.setData({
                       address
                   })
               }
            },
            fail:()=>{
                
            }
        })
    },
    getPromotion(){
        $api({
            method:'GET',
            url:'/promotion',
            success:(data)=>{
                this.setData({
                    promotion:data
                })
                this.changeOrder()

            }
        })
    },
    changeOrder(list){
        if(!list)list = this.data.list;
        let totalPrice = 0;
        list.forEach(item=>{
            let {info} = item;
            totalPrice += info.number * info.price;
        })
        let {enable,point,reward} = this.data.promotion;
        if(enable){
            if(totalPrice >= point)totalPrice = totalPrice-reward;
        }
        totalPrice = totalPrice.toFixed(2);
        this.setData({
            list,
            totalPrice
        });
    },
    changeNumber(e){
        let {index,type}= e.currentTarget.dataset;
        let {list} = this.data;
        let order = list[index];
        if(type=="add"){
            order.info.number++
        }else{
            order.info.number--
        }
        if(order.info.number < 1){
            order.info.number = 1
        }
        this.changeOrder(list)
    },
    verify(){
        let {address}= this.data;
        if(!address){
            wx.showModal({
                title: '提示',
                content: '请先设置收货地址!',
                showCancel: false
            })
            return false;
        }
        return true;
    },
    payagain(id){
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
    pay(){
        if(!this.verify())return;
        if(this._id){
            this.payagain(this._id);
            return;
        }
        let {address,totalPrice,list,promotion} = this.data;
        let goods = [];
        let cart_ids = [];
        list.forEach(item=>{
            goods.push(item.info);
            cart_ids.push(item._id);
        })
        let obj = {
            address,
            goods,
            totalPrice,
            cart_ids,
            promotion
        }
        $api({
            method:'POST',
            url:'/order',
            data: obj,
            success:({config,_id})=>{
                this._id = _id;
                /**
                 *  {
                        appId:"wxf860****03b5dfb"
                        nonceStr:"o5any3uj14tyfjr8wa249n5s0nnp9rkl"
                        package:"prepay_id=wx20171104151803201b17a3100900948881"
                        paySign:"D2632F71E4CB7E9E18D329460FDF5EB0"
                        signType:"MD5"
                        timeStamp:"1509779883"
                    }
                 */
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
                            success:()=>{
                                wx.redirectTo({
                                    url: '/pages/mine/orderlist/index'
                                })
                            }
                        });
                    }
                },config)
                wx.requestPayment(obj)
               
               
            },
            fail:()=>{

            }
        })
    },
    goAddress(){
        wx.navigateTo({
            url: '/pages/mine/address/index'
        })
    },
    onShow(){
        this.getDefaultAddress()
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: '确认订单'
        })
        
        
        let orderList = wx.getStorageSync('orderList')
        wx.removeStorage({key:'orderList'})
        this.initial()
        this.changeOrder(orderList)
        
    }
})