//index.js
import { $api } from '../../utils/api'
import { fetchUserInfo, login} from '../../utils/index'
import { imagePrefix} from '../../utils/config'

//获取应用实例
var app = getApp()
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
    imagePrefix
  },
  getList(){
    if(this.data.hasMore){
      let queryInfo = this.queryInfo;
      $api({
        method: 'GET',
        url: '/goods',
        data: queryInfo,
        success:(list)=>{
          this.queryInfo.page++;
          this.queryInfo.skip = (this.queryInfo.page -1) * this.queryInfo.limit;
          this.setData({
            list,
            loading: false,
            hasMore: list.length < this.queryInfo.limit
          })
        },
        fail:()=>{
  
        }
      })
    }
  },
  onLoad() {
    this.getList()
  }
})
