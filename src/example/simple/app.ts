import axios from "../../index"

axios({
    method:"get",
    url:"/simple/get",
    parmas:{
        a:1,
        b:2
    }
})