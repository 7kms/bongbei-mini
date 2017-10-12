//index.js
import { $api } from '../../../utils/api'
import { fetchUserInfo, login } from '../../../utils/index'
import { imagePrefix } from '../../../utils/config'

Page({
    queryInfo:{
        page: 1,
        limit: 15,
        skip: 0,
        projections:{
          cover: 1,
          name: 1,
          price: 1,
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
            },
            fail:()=>{
      
            }
          })
        }
      },
    onLoad() {
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
      this.queryInfo.options.category = id;
      if(id == 'all'){
        delete this.queryInfo.options.category
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
        hasMore: true
      },()=>{
        this.getList();
      });
    }
})