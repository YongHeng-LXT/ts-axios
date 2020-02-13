import { isPlainObject } from "./util"

//处理data数据,将标准对象转换成JSON字符串
export function transformRequest(data:any):any{
    if(isPlainObject(data)){
        return JSON.stringify(data)
    }
    return data
}

//将返回的JSON数据进行解析,返回对象格式
export function transformResponse(data:any):any{
    if(typeof data==="string"){
        try{
            data=JSON.parse(data)
        }catch(e){}
    }
    return data
}