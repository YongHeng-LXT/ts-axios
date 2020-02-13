const express = require('express')
const bodyParser=require("body-parser")
const webpack=require("webpack")
const webpackDevMiddleware=require("webpack-dev-middleware")
const webpackHotMiddleware=require("webpack-hot-middleware")
const WebpackConfig=require("./webpack.config");

const app=express();
const compiler=webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler, { 
    publicPath: '/__build__/', 
    stats: { 
        colors: true, 
        chunks: false 
    } 
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port=process.env.PORT||1110
module.exports=app.listen(port,()=>{
    console.log(`http://localhost:${port}端口打开成功`);
})

let router=express.Router();
app.use(router)
router.get("/simple/get",function(req,res){
    res.json({
        msg:"连接成功"
    })
})

router.get("/base/get",function(req,res){
    res.json({
        msg:"连接成功",
        req:req.query
    })
})