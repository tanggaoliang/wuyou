import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

export default class CarouselActivityComponent extends Component {
  static defaultProps = {
    data: [],
    width: 640,
    height: 300
  }
  state = {
   indicatorDots: false,
   indicatorColor: 'rgba(0, 0, 0, .3)',
   indicatorActiveColor: '#000',
   interval: 3000,
   duration: 500,
   autoPlay: true,
   swiperHeight: 300,
   current: 0
  }
  componentWillMount() {
    const { width, height } = this.props;
    const systemInfo = Taro.getSystemInfoSync();
    const swiperHeight = systemInfo.windowWidth * height / width;
    this.setState({ swiperHeight })
  }

  componentWillUnmount() {
    this.setState({
      autoPlay: false
    })
  }
  componentDidHide() {
    this.setState({
      autoPlay: false
    })
  }
  bannerSlide(e){
    const current=e.target.current;
    this.setState({current,autoPlay:true})
  }

  previewImage(){
    const { current } = this.state;
    const { data } = this.props;
    Taro.previewImage({
      urls:data,
      current,
    }).then(res=>{
      console.log('previewImage',res)
    })
  }

  render() {
    const { indicatorDots, indicatorColor, indicatorActiveColor, interval, duration, autoPlay, current, swiperHeight } = this.state;
    const { data } = this.props;
    return (
      <View className='banner-wrap'>
        <Swiper className='banner' indicatorDots={indicatorDots} indicatorColor={indicatorColor} indicatorActiveColor={indicatorActiveColor} interval={interval} duration={duration} current={current} autoplay={autoPlay} style={{ height: `${swiperHeight}px` }} onChange={this.bannerSlide}>
        {
        data.length && data.map((item, index) => {
        return (
        <SwiperItem key={index}>
          <Image className='banner-img' src={item} mode='widthFix' onClick={this.previewImage}></Image>
              </SwiperItem>
            )
          })
          }
        </Swiper>
        {!indicatorDots &&
        <View className='swiper-dots'>
          {
            data.length && data.map((item, index) => {
            return (
              <View key={index} className={`swiper-dot ${index == current ? 'swiper-dot_on' : ''}`}></View>
              )
            })
            }
            </View>
          }
      </View>
    )
  }
}