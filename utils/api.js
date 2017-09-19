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
        success,
        fail
    })
}

module.exports = {
    $api
}