import Taro, { Component } from '@tarojs/taro'
import { View, RichText, Button, Text } from '@tarojs/components'
import './index.scss'
import CarouselActivityComponent from '../../components'

import API from '../../../service/request'
import Tools from '../../../utils/Tools'
import Jump from '../../../utils/Jump'

export default class Detail extends Component {
  config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: "@3abb8f"
  }
  state = {
    detail: {}
  }
  componentWillMount() {
    this.id = this.$router.params.id
    this.getActivityByID()
  }
  getActivityByID() {
    API.get(`activity/getActivityByID?id=${this.id}`)
      .then(res => {
        if (res.code == 1) {
          const detail = res.data
          Taro.setNavigationBarTitle({ title: detail.title })
          this.setState({ detail })
        }
      })
  }
  makePhoneCall() {
    Taro.makePhoneCall({
      phoneNumber: this.state.detail.phone
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  openLocation() {
    console.log("open location", this.state.detail.position)
  }
  onShareAppMessage() {
    return {
      title: `芜优生活 - ${this.state.detail.title}`,
      path: `/activity/pages/detail/index?id=${this.id}&share_id=${Taro.getStorageSync('user').id}`
    }
  }
  render() {
    const { detail } = this.state;
    return (
      <View className=''>
        <CarouselActivityComponent data={detail.more} width={750} height={443} />
        <View className='activity-content'>
          <View className='activity-section'>
            <View className='activity-title'>
              <View className='activity-h1'>{detail.title}</View>
              <View className='activity-tags'>
                {
                  detail.keywords.length && detail.keywords.map((item, index) => {
                    return (
                      <Text className='activity-tag' key={index} >{item}</Text>
                    )
                  })
                }
              </View>
            </View>
            <View className='activity-comment' onClick={() => { Jump(`/pages/comments/index?id=${detail.id}&table_name=portal_activity`) }}>
              <View className='activity-comment_t1'>查看评论</View>
              <View className='activity-comment_t2'>{detail.comment}</View>
            </View>
            <View className='activity-bar2'>
              <View className='activity-bar2_t1'>
                <View className='activity-bar2_t2'>￥{detail.discount}</View>
                <View className='activity-bar2_t3'>￥{detail.price}</View>
              </View>
              <View className='activity-bar2_t4'>{detail.enroll}人参加</View>
            </View>
            <View className='activity-desc'>
              <View className='activity-intro'><RichText nodes={Tools.formatImageStyle(detail.intro)}></RichText></View>
              {detail.activity_date.length && <View className='activity-label'>
                <View className='activity-label_t1'>时间</View>
                <View className='activity-text'>{detail.activity_date}</View>
              </View>}
              <View className='activity-label'>
                <View className='activity-label_t1'>地址</View>
                <View className='iconfont icon-address' onClick={this.openLocation.bind(this)}>{detail.address}</View>
              </View>
            </View>
            <View className='activity-content2'>
              <RichText nodes={Tools.formatImageStyle(detail.content)}></RichText>
            </View>
            <View className='fixed-bar'>
              <View className='fixed-items' onClick={() => { Jump('/pages/index/index'), 5 }}>
                <View className='iconfont icon-home'></View>
                <View className='fixed-text'>首页</View>
              </View>
              <Button className='fixed-item button-reset' openType='contact'>
                <View className='iconfont icon-kefu'></View>
                <View className='fixe-text'>客服</View>
              </Button>
              <Button className='fixed-item button-reset' openType='share'>
                <View className='iconfont icon-share1'></View>
                <View className='fixed-text'>分享</View>
              </Button>
            </View>
            <View className='fixed-options'>
              <View className='fixed-opt fixed-opt2' onClick={() => { Jump(`/activity/pages/signup/index?id=${this.id}`) }}>立即购买</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}