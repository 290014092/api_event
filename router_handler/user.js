/**
 * 抽离业务处理模块
 */
// 导入sql模块
const db = require('../db/index');
// 导入加密模块
const bcrypt = require('bcryptjs');
/**
 * @regUser 注册
 */

exports.regUser = (req,res)=>{
    // 验证表单的合法性
    const userInfo = req.body;
    if(!userInfo.username || !userInfo.password){
        return res.send({
            status:1,
            message:'用户名或密码不能为空'
        })
    }
    // 检测用户名是否被占用
    const regSql = 'select * from ev_users where username=?';
    db.query(regSql,userInfo.username,(err,results)=>{
        // 执行sql语句失败
        if(err){
            return res.cc(err)
        }
        // 用户名被占用
        if(results.length > 0){
            res.cc('用户名已被占用')
        }
        // 数据合法 向数据库中插入数据
        userInfo.password = bcrypt.hashSync(userInfo.password,10);
        const regSql2 = 'insert into ev_users set ?';
        db.query(regSql2,{username:userInfo.username,password:userInfo.password},(err,results)=>{
            // 执行sql语句失败
            if(err){
                return res.cc(err)
            }
            // 执行sql语句成功但是影响行数不为1
            if(results.affectedRows !== 1 ){
                return res.cc('注册失败，请重新注册')
            }
            // 注册成功
            res.cc('注册成功',0);
        })
    })
}

/**
 * @login 登录
 */

exports.login = (req,res)=>{
    console.log('OK!');
}
