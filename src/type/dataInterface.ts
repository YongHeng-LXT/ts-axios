//对请求数据进行接口定义
interface AxiosRequestConfig{
    url:string
    method?:Method
    data?:any
    parmas?:any
    headers?:any
    responseType?:XMLHttpRequestResponseType
}

//对请求方式进行定义
type Method='get'|'GET'
            |'post'|'POST'
            |'put'|'PUT'
            |'delete'|'DELETE'
            |'head'|'HEAD'
            |'options'|'OPTIONS'
            |'pacth'|'PACTH'

//对返回数据的格式进行接口定义
interface AxiosResponse{
    data:any
    status:number
    statusText:string
    headers:any
    config:AxiosRequestConfig
    request:any
}

//定义axios返回的Promise对象接口
export interface AxiosPromise extends Promise<AxiosResponse> {

}

export {AxiosRequestConfig,AxiosResponse}