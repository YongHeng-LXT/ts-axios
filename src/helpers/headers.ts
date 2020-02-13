import {isPlainObject} from "./util"

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