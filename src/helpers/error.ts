import { AxiosRequestConfig, AxiosResponse } from '../type/dataInterface'

//定义AxiosError构造函数
export class AxiosError extends Error{
    isAxiosError:boolean
    config:AxiosRequestConfig
    code?:string|null
    request?:any
    response?:AxiosResponse

    constructor(
        message:string,
        config:AxiosRequestConfig,
        code?:string|null,
        request?:any,
        response?:AxiosResponse
    ){
        super(message)
        this.config=config
        this.code=code
        this.request=request
        this.response=response
        this.isAxiosError=true
        Object.setPrototypeOf(this,AxiosError.prototype)
    }
}

//用于创建AxiosError实例
export function createError(
    message:string,
    config:AxiosRequestConfig,
    code?:string|null,
    request?:any,
    response?:AxiosResponse
):AxiosError{
    const error=new AxiosError(message,config,code,request,response)
    return error
}