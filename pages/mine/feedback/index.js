import { $api } from '../../../utils/api'
Page({
    feedback(message){
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
                    showCancel: false,
                    success: function() {
                        wx.switchTab({
                            url: '/pages/index/index'
                          })
                    }
                })
            },
            fail:()=>{

            }
        })
    },
    submit(e){
        let value = e.detail.value.textarea.trim();
        if(!value){
            wx.showModal({
                title: '提示',
                content: '内容不能为空!',
                showCancel: false
            })
            return false
        }
        this.feedback(value)
    }
})