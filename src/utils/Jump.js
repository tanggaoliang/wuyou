import Taro from '@tarojs/taro'

export default (url, type = 1, delta = 1) => {
  switch (type) {
    case 1:
      Taro.navigateTo({ url })
      break;
    case 2:
      Taro.redirectTo({ url })
      break;
    case 3:
      Taro.switchTab({ url })
      break;
    case 4:
      Taro.navigateBack({ delta })
      break;
    case 5:
      Taro.reLaunch({ url })
      break;
    default:
      Taro.navigateTo({ url })
      break;
  }
}