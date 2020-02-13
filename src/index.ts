import {AxiosRequestConfig} from "./type/dataInterface"
import {xhr} from "./xhr"
import {bulidURL} from "./helpers/url"
import {transformRequest} from "./helpers/data"

function transformUrl(config:AxiosRequestConfig):string{
    const {url,parmas}=config
    return bulidURL(url,parmas)
}

function transformRequestData(config:AxiosRequestConfig):any{
    return transformRequest(config.data)
}

function processConfig(config:AxiosRequestConfig):void{
    config.url=transformUrl(config);
    config.data=transformRequestData(config);
}

function axios(config:AxiosRequestConfig){
    processConfig(config);
    xhr(config);
}

export {axios}