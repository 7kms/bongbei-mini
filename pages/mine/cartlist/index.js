import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        totalPrice: 0,
        selectedAll: false,
        imagePrefix,
        list:[]
    },
    onLoad(){
        $api({
            method:'GET',
            url: '/cart',
            success:(res)=>{
                this.setData({
                    list: res
                })
                console.log(res)
            },
            fail:()=>{

            }
        })
    },
    calculateTotalPrice(list){
        let price = 0;
        list.forEach(item=>{
            if(item.selected){
                price += item.info.price;
            }
        });
        if(price >= 20)price-=5;
        return price.toFixed(2)
    },
    calculate(list,selectedAll){
        if(typeof selectedAll != "undefined"){
            list.forEach(item=>item.selected = selectedAll);
        }else{
            selectedAll = true;
            list.forEach(item=>{
                if(!item.selected){
                    selectedAll = false;
                }
            })
        }
        let totalPrice = this.calculateTotalPrice(list);
        this.setData({
            selectedAll,
            list,
            totalPrice
        })
    },
    toggleAll(){
        let {list,selectedAll} = this.data;
        selectedAll = !selectedAll;
        this.calculate(list,selectedAll)
    },
    toggleCart(e){
        let {index} = e.currentTarget.dataset;
        let {list} = this.data;
        list[index].selected = !list[index].selected;
        this.calculate(list);
    },
    goEdit(e){
        let {index} = e.currentTarget.dataset;
        let {list} = this.data;
    },
    goDelete(e){
        let {index} = e.currentTarget.dataset;
        let {list} = this.data;
        let id = list[index]._id;
        let _this = this;
        wx.showModal({
            title: '提示',
            content: '删除后无法找回,确认删除?',
            success: function(res) {
                if (res.confirm) {
                $api({
                    method:'POST',
                    url: '/cart/remove',
                    data:{
                        cart_ids:[id]
                    },
                    success:(res)=>{
                        list.splice(index,1)
                        _this.calculate(list)
                    },
                    fail:(err)=>{
                        console.log(err)
                    }
                })
                }
            }
        })
    }
})