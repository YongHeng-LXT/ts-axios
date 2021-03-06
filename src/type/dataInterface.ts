//对请求数据进行接口定义
interface AxiosRequestConfig{
    url?:string
    method?:Method
    data?:any
    parmas?:any
    headers?:any
    responseType?:XMLHttpRequestResponseType
    timeout?:number
    [propName: string]: any
    transformRequest?: AxiosTransformer | AxiosTransformer[] 
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    cancelToken?:CancelToken
}

//定义CancelToken实例类型的接口
export interface CancelToken{
    promise:Promise<Cancel>
    reason?:Cancel
    throwIfRequested(): void
}

//定义取消方法接口
export interface Canceler{
    (message?:string):void
}

//定义构造函数的接口
export interface CancelExecutor{
    (cancel:Canceler):void
}

//定义CancelToken的静态方法返回值接口
export interface CancelTokenSource{
    token:CancelToken
    cancel:Canceler
}

//定义CancelToken类的类型
export interface CancelTokenStatic{
    new(executor:CancelExecutor):CancelToken
    source():CancelTokenSource
}

//Cancel实例类型的接口定义
export interface Cancel{
    message?:string
}

//CancelStatic类型的接口定义
export interface CancelStatic{
    new(message?:string):Cancel
}

//定义transform的类型接口
export interface AxiosTransformer { 
    (data: any, headers?: any): any 
}

//定义axios的多种请求方法接口
export interface Axios{
    request(config:AxiosRequestConfig):AxiosPromise
    get(url:string,config?:AxiosRequestConfig):AxiosPromise
    delete(url:string,config?:AxiosRequestConfig):AxiosPromise
    head(url:string,config?:AxiosRequestConfig):AxiosPromise
    options(url:string,config?:AxiosRequestConfig):AxiosPromise
    post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
    put(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
    patch(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
    interceptors:{
        request:AxiosInterceptorManaget<AxiosRequestConfig>
        response:AxiosInterceptorManaget<AxiosResponse>
    }
}

//可以直接用于函数变量的实现 定义一个Axios实例的基本, 这样axios即是一个函数 也拥有n多方法 
export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise 
    (url:string,config?:AxiosRequestConfig):AxiosPromise
}

//对Axios的静态接口定义
export interface AxiosStatic extends AxiosInstance{ 
    create(config?: AxiosRequestConfig): AxiosInstance 

    CancelToken:CancelTokenStatic
    Cancel:CancelStatic
    isCancel:(value:any)=>boolean
}

//对请求方式进行定义
export type Method='get'|'GET'
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

//对于错误信息进行接口定义
export interface AxiosError extends Error { 
    config: AxiosRequestConfig 
    code?: string 
    request?: any 
    response?: AxiosResponse 
    isAxiosError: boolean 
}

//定义拦截器接口
export interface AxiosInterceptorManaget<T>{
    use(resolved:ResolvedFn<T>,rejectrd?:RejectedFn):number
    eject(id:number):void
}

//拦截器resolve
export interface ResolvedFn<T=any>{
    (val:T):T|Promise<T>
}

//拦截器rejected
export interface RejectedFn{
    (error:any):any
}

export {AxiosRequestConfig,AxiosResponse}