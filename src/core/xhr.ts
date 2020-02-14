import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from '../type/dataInterface'
import {parseHeaders} from "../helpers/headers"
import { createError } from '../helpers/error'

//通过配置数据调用原生的XMLHttpRequest对象的方法,进行数据请求
function xhr(config:AxiosRequestConfig):AxiosPromise{
    return new Promise((resolve,reject)=>{
        const {url,data=null,method="get",headers,responseType,timeout,cancelToken}=config;
        const request=new XMLHttpRequest();

        if(responseType){
            request.responseType=responseType
        }

        if(timeout){
            request.timeout=timeout
        }

        request.open(method.toUpperCase(),url!,true);

        Object.keys(headers).forEach((name)=>{
            if(data===null && name.toLowerCase()==="content-type"){
                delete headers[name]
            }else{
                request.setRequestHeader(name,headers[name])
            }
        })

        if(cancelToken){
            cancelToken.promise.then(reason=>{
                request.abort()
                reject(reason)
            })
        }

        request.send(data);

        function handleResponse(response:AxiosResponse){
            if(response.status>=200 && response.status<300){
                resolve(response)
            }else{
                reject(createError( 
                    `Request failed with status code ${response.status}`, 
                    config, 
                    null, 
                    request, 
                    response 
                ))
            }
        }
        request.onreadystatechange=function handleLoad(){
            if(request.readyState!==4){
                return
            }
            if(request.status===0){
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
            handleResponse(response)
        }
        request.onerror=function handleError(){
            reject(createError( 
                'Network Error', 
                config, 
                null, 
                request 
            ))
        }
        request.ontimeout=function handleTimeout(){
            reject(createError( 
                `Timeout of ${config.timeout} ms exceeded`, 
                config, 
                'ECONNABORTED', 
                request 
            ))
        }
    })
}

export {xhr}