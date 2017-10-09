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
      cover: 1
    }
  },
  data: {
    list:[],
    loading: true,
    hasMore: true,
    pending: false,
    imagePrefix
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
        url: '/goods',
        data: queryInfo,
        success:(newList)=>{
          let oldList = this.data.list;
          let list = oldList.concat(newList)
          this.queryInfo.page++;
          this.queryInfo.skip = (this.queryInfo.page -1) * this.queryInfo.limit;
          console.log(newList.length,this.queryInfo.limit)
          this.setData({
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
  onLoad() {
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
    wx.redirectTo({
      url: `/pages/product/detail/index?_id=${id}`
    })
  }
})
