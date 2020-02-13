import { isPlainObject } from "./util"

//处理data数据,将标准对象转换成JSON字符串
export function transformRequest(data:any):any{
    if(isPlainObject(data)){
        return JSON.stringify(data)
    }
    return data
}