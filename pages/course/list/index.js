import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'

Page({
    data:{
        imagePrefix
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: "烘焙小课程"
        })
        $api({
            method:'GET',
            url: '/course',
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
    goDetail(e){
        let {id} = e.currentTarget.dataset;
        wx.redirectTo({
            url: `/pages/course/detail/index?id=${id}`
        })
    }
})