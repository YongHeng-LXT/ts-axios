import {AxiosRequestConfig} from "./type/dataInterface"
import {xhr} from "./xhr"
import {bulidURL} from "./helpers/url"

function transformUrl(config:AxiosRequestConfig):string{
    const {url,parmas}=config
    return bulidURL(url,parmas)
}

function processConfig(config:AxiosRequestConfig):void{
    config.url=transformUrl(config);
}

function axios(config:AxiosRequestConfig){
    processConfig(config);
    xhr(config);
}

export {axios}