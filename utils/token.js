
const store = {}

let getToken = function(){
    let {token} = store;
    if(!token){
        token = wx.getStorageSync('token')
    }
    return token;
}

let setToken = function(token){
    store.token = token;
    wx.setStorageSync('token',token);
}

export {
    getToken,
    setToken
}