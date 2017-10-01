import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix ,
        message: "你好 我是feedback"
    },
    feedback(){
        let message = this.data.message;
        $api({
            method:"POST",
            url:"/feed",
            data:{
                message
            },
            success:()=>{
                wx.showModal({
                    title: '提示',
                    content: '谢谢您的反馈!',
                    showCancel: false
                })
            },
            fail:()=>{

            }
        }) 
    },
    onLoad(){
        this.feedback()
    }
})