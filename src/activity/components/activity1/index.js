import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import Jump from '../../../utils/Jump'
import imgicon from '../../../images/imgicon.png'

export default class ActivityComponent extends Component {
  static defaultProps = {
    datas: [],
  }
  render() {
    const { datas } = this.props;
    return (
      <View className='activity-con'>
        {
          datas.length && datas.map((item) => {
            return (
              <View className='activity-item' key={item.id} onClick={() => { Jump(`/activity/pages/detail/index?id=${item.id}`) }}>
                <View className='activity-item_pic'><Image className='widthFix' src={item.thumbnail || imgicon} mode='widthFix' /></View>
                <View className='activity-item_info'>
                  <View className='activity-item_title'>{item.title}</View>
                  <View className='activity-item_content'>{item.content}</View>
                  <View className='activity-item_action'>
                    <View className='activity-item_people'>{item.enroll}<Text className='activity-item_ts'>人报名</Text></View>
                    <View className='activity-item_date'><Text className='iconfont icon-calendar'>{item.activity_date}</Text></View>
                  </View>
                </View>
              </View>

            )
          })
        }
      </View>
    );
  }
}


