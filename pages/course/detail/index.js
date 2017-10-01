import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix
    },
    onLoad({id}){
        $api({
            method:'GET',
            url: `/course/${id}`,
            success:(res)=>{
                this.setData({
                    info: res
                })
                wx.setNavigationBarTitle({
                    title: res.title
                })
                console.log(res)
            },
            fail:()=>{

            }
        }) 
    }
})