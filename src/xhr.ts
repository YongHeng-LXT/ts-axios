import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from './type/dataInterface'
import { resolve } from 'dns';
import { request } from 'http';
import {parseHeaders} from "./helpers/headers"

//通过配置数据调用原生的XMLHttpRequest对象的方法,进行数据请求
function xhr(config:AxiosRequestConfig):AxiosPromise{
    return new Promise((resolve)=>{
        const {url,data=null,method="get",headers,responseType}=config;
        const request=new XMLHttpRequest();

        if(responseType){
            request.responseType=responseType
        }

        request.open(method.toUpperCase(),url,true);

        Object.keys(headers).forEach((name)=>{
            if(data===null && name.toLowerCase()==="content-type"){
                delete headers[name]
            }else{
                request.setRequestHeader(name,headers[name])
            }
        })

        request.send(data);

        request.onreadystatechange=function handleLoad(){
            if(request.readyState!==4){
                return
            }
            const responseHeaders=parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response:AxiosResponse={
                data:responseData,
                status:request.status,
                statusText:request.statusText,
                headers:responseHeaders,
                config,
                request
            }
            resolve(response)
        }
    })
}

export {xhr}