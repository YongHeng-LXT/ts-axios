import {AxiosInstance} from "./type/dataInterface"
import Axios from "./core/Axios"
import {extend} from "./helpers/util"

//定义创建接口函数
function createInstance():AxiosInstance{
    const context=new Axios()
    const instance=Axios.prototype.request.bind(context)

    extend(instance,context)

    return instance as AxiosInstance
}

const axios=createInstance()
export {axios}