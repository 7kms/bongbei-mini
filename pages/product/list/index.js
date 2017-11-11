//index.js
import { $api } from '../../../utils/api'
import { fetchUserInfo, login, sharePage } from '../../../utils/index'
import { imagePrefix } from '../../../utils/config'

Page(sharePage({
    queryInfo:{
        page: 1,
        limit: 15,
        skip: 0,
        projections:{
          cover: 1,
          name: 1,
          priceInfo: 1,
          sales: 1,
          category: 1
        },
        options:{

        }
    },
    data: {
        category:[],
        list:[],
        loading: true,
        hasMore: true,
        pending: false,
        imagePrefix
    },
    getCategory(){
        $api({
          method: 'GET',
          url: '/category',
          success:(res)=>{
            res.unshift({name:'全部',_id:'all',active:true})
            this.setData({
              category: res
            })
          },
          fail:()=>{
    
          }
        })
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
              let list =  oldList.concat(newList);
              this.queryInfo.page++;
              this.queryInfo.skip = (this.queryInfo.page -1) * this.queryInfo.limit;
              console.log(newList.length,this.queryInfo.limit)
              this.setData({
                list,
                loading: false,
                pending: false,
                hasMore: newList.length >= this.queryInfo.limit
              })
              wx.hideLoading()
            },
            fail:()=>{
      
            }
          })
        }
      },
      // onHide(){
      //   this.queryInfo.page=1;
      //   this.queryInfo.skip=0;
      //   this.queryInfo.options = {};
      //   this.setData({
      //     list:[],
      //     loading: true,
      //     hasMore: true,
      //     pending: false
      //   })
      // },
    onLoad() {
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        this.getCategory();
        wx.getSystemInfo({
            success:(res)=>{
                this.setData({
                  scrollHeight:res.windowHeight - 44
                })
                this.getList()
            }
        });   
    },
    loadMore(){
        this.getList();
    },
    goDetail(e){
        let {id} = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/product/detail/index?_id=${id}`
        })
    },
    changeFilter(e){
      let {id,index} = e.currentTarget.dataset;
      if(id == 'all'){
        if(!this.queryInfo.options.category)return false;
        delete this.queryInfo.options.category;
      }else{
        if(this.queryInfo.options.category == id){
          return false;
        }
        this.queryInfo.options.category = id;
      }
      this.queryInfo.page = 1;
      this.queryInfo.skip = 0;
      let {category} = this.data;
      category.forEach(item=>{
        item.active = item._id == id;
      });
      this.setData({
        category,
        list: [],
        loading: true,
        hasMore: true
      },()=>{
        wx.showLoading({
          title: '加载中',
          mask: true
        })  
        this.getList();
      });
    }
}))