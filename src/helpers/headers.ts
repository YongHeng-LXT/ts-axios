import { isPlainObject,deepMerge } from './util'
import {Method} from "../type/dataInterface"

//标准化请求头信息,将请求头的key与设定的保持一致
function normalizeHeaderName(headers:any,normalizeName:string):void{
    if(!headers){
        return
    }
    Object.keys(headers).forEach(name=>{
        if(name!==normalizeName && name.toUpperCase()===normalizeName.toUpperCase()){
            headers[normalizeName]=headers[name]
            delete headers[name]
        }
    })
}

//在用户没有定义指定的请求头key的情况下对需要定义的请求头key进行定义
export function processHeaders(headers:any,data:any):any{
    normalizeHeaderName(headers,"Content-Type")

    if(isPlainObject(data)){
        if(headers && !headers["Content-Type"]){
            headers["Content-Type"]="application/json;charset=utf-8"
        }
    }
    return headers
}

//将返回头的数据从字符串格式设置为对象格式
export function parseHeaders(headers:string):any{
    let parsed=Object.create(null)
    if(!headers){
        return parsed
    }
    headers.split("\r\n").forEach(line=>{
        let [key,val]=line.split(":")
        key=key.trim().toLowerCase()
        if(!key){
            return
        }
        if(val){
            val=val.trim()
        }
        parsed[key] = val
    })
    return parsed;
}

//将头部信息解开一层
export function flattenHeaders(headers:any,method:Method):any{
    if(!headers){
        return headers
    }
    headers=deepMerge(headers.common || {},headers[method] || {},headers)
    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    methodsToDelete.forEach(method=>{
        delete headers[method]
    })
    return headers
}