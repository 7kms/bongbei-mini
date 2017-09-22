var config = require('./config')
import { getToken,setToken } from './token'

function $api({method='GET',url,data,success,fail}) {
    url = config.serverUrl + url;
    wx.request({
        method,
        url,
        data,
        header: {
            token: getToken(),
            'content-type': 'application/json' // 默认值
        },
        success: function(res){
            if(res.header.token){
                setToken(res.header.token)
            }
            if(res.statusCode >= 200 && res.statusCode < 300){
                success(res.data.data)
            }else{
                fail && fail()
            }
        },
        fail
    })
}

export {
    $api  
}