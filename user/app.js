const express = require('express');
// 创建服务器实例
const app = express();
// 导入cors中间件
const cors = require('cors');
// 导入路由模块
const router = require('../router/user');
// 全局注册cors解决跨域问题
app.use(cors());
// 配置解析application/x-www-form-urlencoded数据格式的中间件
app.use(express.urlencoded({extended:false}));

// 添加统一访问前缀
app.use('/api',router);
// 导入数据库模块
const db = require('../db/index');
// const sql = 'select * from users'
// 测试数据库连接是否成功
// db.query('select 1',(err,results)=>{
//     console.log(err);
//     console.log(results);
// })


// 启动服务器
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})