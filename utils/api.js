var config = require('./config')

function $api({method='GET',url,data,success,fail}) {
    url = config.serverUrl + url
    wx.request({
        method,
        url,
        data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res){
            if(res.statusCode >= 200 && res.statusCode < 300){
                success(res)
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