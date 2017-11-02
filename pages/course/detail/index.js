import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix
    },
    onLoad({id}){
        this.id = id;
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
    },
    onShareAppMessage() {
        let id = this.id;
        let name = this.data.info ? this.data.info.title : '';
        return {
          title: `卷趣烘焙 | ${name}`,
          path: '/pages/product/detail/index?id='+id,
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
    }
})