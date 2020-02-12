interface AxiosRequestConfig{
    url:string
    method?:Method
    data?:any
    parmas?:any
}

type Method='get'|'GET'
            |'post'|'POST'
            |'put'|'PUT'
            |'delete'|'DELETE'
            |'head'|'HEAD'
            |'options'|'OPTIONS'
            |'pacth'|'PACTH'

export {AxiosRequestConfig}