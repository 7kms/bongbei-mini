//index.js
import { $api } from '../../utils/api'
import { fetchUserInfo, login } from '../../utils/index'
import { imagePrefix } from '../../utils/config'

Page({
  queryInfo:{
    page: 1,
    limit: 15,
    skip: 0,
    options:{
      onMainPage: true
    },
    projections:{
      cover: 1,
      mainPageCover:1
    }
  },
  data: {
    list:[],
    loading: true,
    hasMore: true,
    pending: false,
    imagePrefix,
    fromActivity: false,
    info:{}
  },
  getList(){
    if(this.data.hasMore && !this.data.pending){
      let queryInfo = this.queryInfo;
      console.log(queryInfo)
      this.setData({
        pending: true
      })
      $api({
        method: 'GET',
        url: '/activity',
        data: queryInfo,
        success:(newList,res)=>{
          let {fromActivity} = res;
          if(fromActivity){
            this.setData({
              fromActivity,
              info: newList[0],
              loading: false,
              pending: false
            });
            return false;
          }
          newList.forEach(item=>{
            if(!item.mainPageCover){
              item.mainPageCover = item.cover
            }
          })
          let oldList = this.data.list;
          let list = oldList.concat(newList)
          this.queryInfo.page++;
          this.queryInfo.skip = (this.queryInfo.page -1) * this.queryInfo.limit;
          console.log(newList.length,this.queryInfo.limit)
          this.setData({
            fromActivity: false,
            list,
            loading: false,
            pending: false,
            hasMore: newList.length >= this.queryInfo.limit
          })
        },
        fail:()=>{
  
        }
      })
    }
  },
  onShow() {
    wx.getSystemInfo({
        success:(res)=>{
            this.setData({
              scrollHeight:res.windowHeight
            })
            this.getList()
        }
    });
  },
  loadMore(){
    this.getList()
  },
  goDetail(e){
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/detail/index?_id=${id}`
    })
  },
  goProduct(){
    wx.switchTab({
      url: '/pages/product/list/index'
    })
  },
  onShareAppMessage:  () => {
    return {
      title: '卷趣烘焙',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
