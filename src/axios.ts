import {AxiosRequestConfig,AxiosStatic} from "./type/dataInterface"
import Axios from "./core/Axios"
import {extend} from "./helpers/util"
import {defaults} from "./defaults"
import mergeConfig from "./core/mergeConfig"
import CancelToken from './cancel/CancelToken' 
import Cancel, { isCancel } from './cancel/Cancel'

//定义创建接口函数
function createInstance(config:AxiosRequestConfig): AxiosStatic{
    const context=new Axios(config)
    const instance=Axios.prototype.request.bind(context)

    extend(instance,context)

    return instance as AxiosStatic
}

const axios=createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) { 
    return createInstance(mergeConfig(defaults, config)) 
}

axios.CancelToken = CancelToken 
axios.Cancel = Cancel 
axios.isCancel = isCancel
export {axios}