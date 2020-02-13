import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type/dataInterface'
import {xhr} from "./xhr"
import {bulidURL} from "./helpers/url"
import {transformRequest} from "./helpers/data"
import {processHeaders} from "./helpers/headers"


//url字符串与parmas查询字符串进行拼接,返回拼接完成后的字符串
function transformUrl(config:AxiosRequestConfig):string{
    const {url,parmas}=config
    return bulidURL(url,parmas)
}

//调用transformRequest函数,对标准对象进行处理,转换成JSON字符串
function transformRequestData(config:AxiosRequestConfig):any{
    return transformRequest(config.data)
}

//调用processHeaders函数,对请求头进行封装
function transformHeaders(config:AxiosRequestConfig){
    const {headers={},data}=config
    return processHeaders(headers,data)
}

//对传过来的配置数据进行更改,调用上面的函数进行统一更改
function processConfig(config:AxiosRequestConfig):void{
    config.url=transformUrl(config);
    config.headers=transformHeaders(config);
    config.data=transformRequestData(config);
}

//主函数,实现axios功能的接口函数
function axios(config:AxiosRequestConfig):AxiosPromise{
    processConfig(config);
    return xhr(config);
}

export {axios}