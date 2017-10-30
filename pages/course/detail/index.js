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
                if(res.sections){
                    res.sections.forEach(item=>{
                        item.desc = item.desc.split(/\r?\n/);
                    })
                }
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