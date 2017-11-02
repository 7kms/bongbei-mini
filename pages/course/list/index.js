import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'

Page({
    data:{
        imagePrefix
    },
    onShow(){
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
        wx.navigateTo({
            url: `/pages/course/detail/index?id=${id}`
        })
    },
    onShareAppMessage() {
        return {
          title: `卷趣烘焙 | 课程`,
          path: '/pages/course/list/index',
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
    }
})