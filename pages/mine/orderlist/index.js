import { $api } from '../../../utils/api'
import { imagePrefix } from '../../../utils/config'
Page({
    data:{
        imagePrefix,
        list: []
    },
    onLoad(){
        $api({
            method:'GET',
            url:'/order',
            success:(data)=>{
               this.setData({
                   list: data
               })
            },
            fail:()=>{

            }
        })
    }
})