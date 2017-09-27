import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'

Page({
    data:{
        imagePrefix,
        loading: true,
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
    }
})