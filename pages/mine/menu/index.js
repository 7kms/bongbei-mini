Page({
    data:{
        avatar: '/images/avatar.png',
        menulist:[
            {
                title: '收货地址',
                icon: '/images/menu-addr.png',
                class:'icon-addr',
                path: '/pages/mine/address/index'
            },
            {
                title:'我的订单',
                icon: '/images/menu-order.png',
                class:'icon-order',
                path:'/pages/mine/orderlist/index'
            },
            {
                title:'购物车',
                icon: '/images/menu-cart.png',
                class:'icon-cart',
                path:'/pages/mine/cart/index'
            },
            {
                title:'问客服',
                icon: '/images/menu-feed.png',
                class:'icon-feed',
                path:'/pages/mine/feedback/index'
            }
        ]
    },
    menuClick: function(e){
        var index = e.currentTarget.dataset.index;
        var path = this.data.menulist[index].path;
        wx.navigateTo({
            url: path
        })
    }
})