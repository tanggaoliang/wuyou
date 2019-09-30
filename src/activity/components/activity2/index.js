import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Jump from '../../../utils/Jump'
import imgicon from '../../../images/imgicon.png'

export default class Activity2Component extends Component {
  static defaultProps = {
    data: [],
  }
  render() {
    const { data } = this.props;
    return (
      <View className='activity-on'>
        {
          data.length && data.map((item) => {
            return (
              <View className='activity-item' key={item.id} onClick={() => { Jump(`/activity/pages/detail/index?id=${item.id}`) }}>
                <View className='activity-item_pic'><Image className='widFix' src={item.thumbnail || imgicon} mode='widthFix' /></View>
                <View className='activity-item_info'>
                  <View className='activity-item-title'>{item.title}</View>
                </View>
              </View>)
          })
        }
      </View>
    )
  }
}