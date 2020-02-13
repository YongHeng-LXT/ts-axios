import {axios} from "../../index"

axios({
    method:"get",
    url:"/base/get",
    parmas:{
        a:1,
        b:2
    }
})

axios({
    method:"post",
    url:"/base/post",
    headers: { 
        'content-type': 'application/json;charset=utf-8'
    },
    data:{
        a:1,
        b:2
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api' 
const searchParams = new URLSearchParams(paramsString) 
axios({ 
    method: 'post', 
    url: '/base/post', 
    data: searchParams 
})

const arr=new Int32Array([21,31])

axios({
    method:"post",
    url:"/base/buffer",
    data:arr
})

axios({ 
    method: 'post', 
    url: '/base/post', 
    data: {
        x:5,
        y:6
    } 
}).then(res=>{
    console.log(res);
})