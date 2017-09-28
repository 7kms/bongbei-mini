import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'

Page({
    data:{
        imagePrefix,
        loading: true,
        showCart: false,
        info: {},
        swiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
            circular: true
        },
        order:{
            number: 1
        }
    },
    getDetail(_id){
        wx.showLoading({
            title:'加载中...'
        })
        $api({
            method: 'GET',
            url: `/goods/${_id}`,
            success:(data)=>{
                data.pictures.unshift(data.cover)
                wx.hideLoading()
                wx.setNavigationBarTitle({
                    title: data.name
                })
                this.setData({
                    info: data,
                    loading: false
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })
    },
    onLoad({_id}){
        this.getDetail(_id)
        wx.setNavigationBarTitle({
            title: '商品详情'
        })
        console.log(_id)
    },
    changeOrder(info){
        let {order} = this.data;
        order = Object.assign(order,info)
        this.setData({
            order
        })
    },
    selectStandard(e){
        let { standard } = e.currentTarget.dataset;
        this.changeOrder({standard})
    },
    changeNumber(e){
        let { store } = this.data.info;
        let { order:{number} } = this.data;
        let { type } = e.currentTarget.dataset;
        if(type == 'add'){
            number ++;
        }else{
            number --;
        }
        number = number < 1 ? number = 1 : number > store ? store : number;
        this.changeOrder({number})
    },
    verify(){
        let {order} = this.data;
        if(!order.standard){
            wx.showToast({
                title: '请选择规格'
            })
            return false;
        }
        let {cover,name,price,_id} = this.data.info;
        let obj = {
            cover,
            name,
            price,
            good_id: _id
        }
        return {...order,...obj}
    },
    addCart(){
        let order = this.verify()
        if(order){
            $api({
                method: 'POST',
                url: `/cart`,
                data:{
                    info:order
                },
                success:(data)=>{
                    console.log(data)
                    this.setData({
                        showCart: true
                    })
                },
                fail:(err)=>{
                    console.log(err)
                }
            })
        }
        
    },
    closeCart(){
        this.setData({
            showCart: false
        })
    },
    goCart(){
        wx.navigateTo({
            url: '/pages/mine/cartlist/index'
        })
    },
    goOrder(){
        wx.navigateTo({
            url: '/pages/mine/orderlist/index'
        })
    }
})