import {axios} from "../../index"

axios({
    method:"get",
    url:"/base/get",
    parmas:{
        a:1,
        b:2
    }
})