import Taro from '@tarojs/taro'
import { observable } from 'mobx'

const pageStore = observable({
  page: 1,
  pageSize: 0,
  loadingStatus: '',
  nodata: false,
  tags: [],
  status: [],
  reset(page = 1, pageSize = 6, total = 0, loadingStatus = '', nodata = false) {
    this.page = page
    this.pageSize = pageSize
    this.total = total
    this.loadingStatus = loadingStatus
    this.nodata = nodata
  },
  setTag(tag) {
    !this.tags.slice().includes(tag) && this.tags.push(tag)
  },
  setTagStatus(tag) {
    this.status.push({ [tag]: { page: this.page, pageSize: this.pageSize, total: this.total, loadingStatus: this.loadingStatus } })
  },
  updateTagStatus(tag) {
    let status = this.status.slice()
    status.map((item, index) => {
      item[tag] && (
        this.status[index][tag] = { page: this.page, pageSize: this.pageSize, total: this.total, loadingStatus: this.loadingStatus }
      )
    })
  },
  setPage(page) {
    this.page = page
  },
  setPageSize(pageSize) {
    this.pageSize = pageSize
  },
  setTotal(total) {
    this.total = total
  },
  setLoadingStatus(loadingStatus) {
    this.loadingStatus = loadingStatus
  },
  setNodata(nodata) {
    this.nodata = nodata
  },
  loadData(tag) {
    if (this.loadingStatus == 'loading') {
      console.warn('加载状态错误(づ╥﹏╥)づ', new Date());
      return
    }
    if (this.loadingStatus == 'loadover') {
      console.warn('全部加载完成🔚', new Date());
      return;
    }
    if (this.nodata) {
      console.warn('数据还在路上呢⊙﹏⊙', new Date());
      return;
    }
    let tags = this.tags.slice()
    if (!tags.includes(tag)) {
      throw new Error('加载标签错误', `correct:${this.tags}`, `current:${tag}`)
    }
    if (this.total > this.page * this.pageSize) {
      this.loadingStatus = 'loading'
      this.page = this.page + 1
      return true
    } else {
      this.loadingStatus = 'loadover'
      this.updateTagStatus(tag)
      return false
    }
  },
  tabSwitch(tag) {
    let tags = this.tags.slice()
    this.status = this.status.slice()
    //已经加载过标签页
    if (tags.includes(tag)){
      this.status.map(item=>{
        item[tag]&&(
          this.reset(item[tag].page,item[tag].pageSize,item[tag].loadingStatus),
          item[tag].total<=item[tag].pageSize*item[tag].page&&this.setLoadingStatus('loadover'),
          item[tag].total==0&&this.setNodata(true)
        )
      })
      return true
    }
    //第一次加载该标签页
    this.setTag(tag)
    this.reset()
    return false
  },
  clear(...tags){
    this.page=1
    this.pageSize=0
    this.total=0
    this.loadingStatus=''
    this.nodata=false
    let statusSlice=this.status.slice()
    let tagsSlice=this.tags.slice()
    tags.length&&tags.map(item=>{
      tagsSlice.includes(item)&&this.tags.splice(this.tags.indexOf(item),1)
      statusSlice.map(( item2, index2 ) => { 
      item2[item]&&this.status.splice(index2,1)
      })
    })
  }
})

export default pageStore