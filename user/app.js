const express = require('express');
// 创建服务器实例
const app = express();
// 导入cors中间件
const cors = require('cors');
// 导入路由模块
const router = require('../router/user');
const Joi = require('@hapi/joi');
// 全局注册cors解决跨域问题
app.use(cors());
// 配置解析application/x-www-form-urlencoded数据格式的中间件
app.use(express.urlencoded({extended:false}));
// 挂载全局自定义中间件 处理每次请求的返回信息
app.use((req,res,next)=>{
    res.cc = function(msg,status = 1){
        res.send({
            status:status,
            message:msg instanceof Error?msg.message:msg
        })
    }
    next();
})
// 添加统一访问前缀
app.use('/api',router);
// 捕获错误处理中间件
app.use((err,req,res,next)=>{
    // 数据验证错误
    if(err instanceof Joi.ValidationError){
        return res.cc(err)
    }
    // 未知错误
    res.cc(err);
    next();
})
// 启动服务器
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})