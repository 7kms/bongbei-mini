import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix,
        totalPrice: 0,
        list: []
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
    changeOrder(list){
        let totalPrice = 0;
        list.forEach(item=>{
            let {info} = item;
            totalPrice += info.number * info.price;
        })
        if(totalPrice >= 20)totalPrice = totalPrice-5;
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
    pay(){
        if(!this.verify())return;
        let {address,totalPrice,list} = this.data;
        let goods = list.map(item=>{
            return item.info;
        })
        console.log(goods)
        return false;
        let obj = {
            address,
            goods,
            totalPrice
        }
        $api({
            method:'POST',
            url:'/order',
            data: obj,
            success:(data)=>{
                wx.showModal({
                    title: '提示',
                    content: '提交成功',
                    showCancel: false
                })
            },
            fail:()=>{

            }
        })
    },
    onLoad(){
        this.getDefaultAddress()
        let orderList = wx.getStorageSync('orderList')
        wx.removeStorage({key:'orderList'})
        this.changeOrder(orderList)
    }
})