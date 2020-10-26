const express = require('express');
// 创建路由对象
const router = express.Router();
// 导入业务处理模块
const userHandler = require('../router_handler/user')
// 导入第三方用户信息验证模块
const joi = require('@hapi/joi');
// 导入验证规则模块
const {reg_login_schema} = require('../schema/user');
// 注册新用户
router.post('/reguser',joi(reg_login_schema),userHandler.regUser);
// 登录
router.post('/login',joi(reg_login_schema),userHandler.login);

// 暴露路由
module.exports = router;