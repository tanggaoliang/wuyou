import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import API from '../service/request'

const filterStore = observable({
  filterAreas: [],
  filterPrices: [],
  filterHouseTypes: [],
  filterTypesof: [],
  filterSorts: [],
  source: '',
  type: '',
  value: '',
  offsetTop: 0,
  ifFixed: false,
  setOffsetTop(offsetTop) {
    this.offsetTop = offsetTop
  },
  setFixed(isFixed) {
    this.isFixed = isFixed
  },
  setValue(source, type, value) {
    (source) && (this.source = source);
    (type) && (this.type = type);
    (value) && (this.value = value);
  },
  getFilterConditions(callback) {
    let types = '';
    (this.source == 'HOUSETYPES') && (types = 1);
    (this.source == 'FOODTYPES') && (types = 2);
    (this.source == 'ACTIVITYTYPES') && (types = 3);
    API.get(`Catalog_class/getCatalogClassByArr?types=${types}`)
      .then(res => {
        if (res.code == 1) {
          const data = res.data
          this.filterAreas = data[0]
          this.filterPrices = data[1]
          this.filterHouseTypes = data[2]
          this.filterTypesof = data[3]
          this.filterSorts = data[4]
            (typeof (callback) === 'function' && callback())
        } else {
          Taro.showToast({
            title: '获取分类失败',
            icon: 'none'
          })
        }
      })
  },
  setFilterConditions(index) {
    let filterConditions = []
    switch (index) {
      case 0:
        filterConditions = this.filterAreas;
        break;
      case 1:
        filterConditions = this.filterPrices;
        break;
      case 2:
        filterConditions = this.filterHouseTypes;
        break;
      case 3:
        filterConditions = this.filterHouseTypes;
        break;
      case 4:
        filterConditions = this.filterTypesof;
        break;
    }
    return filterConditions
  },
  clear(){
    this.source=''
    this.type=''
    this.value=''
    this.offsetTop=0
    this.ifFixed=false
  }
})

export default filterStore