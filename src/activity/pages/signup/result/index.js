import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { observer, inject } from '@tarojs/mobx'
import API from '../../../../service/request'
import Jump from '../../../../utils/Jump'

@inject('userStore')
@observer
export default class WxpayResult extends Component {
  config = {
    navigationBarTitleText: '',
		navigationBarBackgroundColor: '#3abd8f'
  }
  state={
    hotActivity:[]
  }
  componentWillMount(){
    const { userStore } = this.props;
  }
  render() {
    return (null)
  }
}