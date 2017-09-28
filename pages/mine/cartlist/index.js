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
    toggleAll(){
        let {list,selectedAll} = this.data;
        selectedAll = !selectedAll;
        list.forEach(item=>item.selected = selectedAll);
        let totalPrice = this.calculateTotalPrice(list);
        this.setData({
            selectedAll,
            list,
            totalPrice
        })
    },
    toggleCart(e){
        let {index} = e.currentTarget.dataset;
        let {list} = this.data;
        list[index].selected = !list[index].selected;
        let selectedAll = true;
        let totalPrice = this.calculateTotalPrice(list)
        list.forEach(item=>{
            if(!item.selected){
                selectedAll = false;
            }
        })
        this.setData({
            list,
            selectedAll,
            totalPrice
        })
    }
})