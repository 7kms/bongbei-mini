import { $api } from '../../../utils/api'
Page({
    onLoad(){
        $api({
            method:'GET',
            url: '/cart',
            success:(res)=>{
                console.log(res)
            },
            fail:()=>{

            }
        })
    }
})