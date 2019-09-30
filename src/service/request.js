import Taro from '@tarojs/taro';
import baseUrl from './baseUrl';
import HTTP_STATUS from './status';
// import logError from './logError';

// 设置代理信息
const proxy = {}

export default {
    TaroApi (params, method='GET') {
        let { url, data, contentType='application/json', urlType, withToken=true, loadingStatus=true, loadingText='加载中' } = {...params};
        // console.log('params', params);
        // application/x-www-form-urlencoded
        let header = {
            'Content-Type': contentType
        }
        if (withToken) {
            header.token = Taro.getStorageSync('user').token;
        }
        let apiurl;
        apiurl = urlType == 'test' ? baseUrl.testPath : baseUrl.basePath;
        const options = {
            url: apiurl + url,
            header: header,
            data: data,
            method: method.toUpperCase(),
            timeout: 10000,
            proxy: proxy
        }
        loadingStatus && Taro.showLoading({
			title: loadingText
		})
        return Taro.request(options)
        .then(res => {
            loadingStatus && Taro.hideLoading();
            // console.log(res);
            if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                console.warn('api', '请求资源不存在');
            } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                console.warn('api', '服务端出现了问题');
            } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                console.warn('api', '没有权限访问');
            } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                return res.data;
            }
        })
        .catch(err => {
			throw new Error('api', '请求接口出现问题', err);
        })
    },
    get (url, options={}) {
        let params = { url, ...options };
        return this.TaroApi(params);
    },
    put (url, data={}, options={}) {
        let params = { url, data, ...options };
        return this.TaroApi(params, 'put');
    },
    post (url, data={}, options={}) {
        let params = { url, data, ...options };
        return this.TaroApi(params, 'POST');
    }
}
