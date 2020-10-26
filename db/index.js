// 导入mysql模块
const mysql = require('mysql');
//建立与数据库的连接
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'mysql_db_01'
})
// 向外共享数据库连接对象
module.exports = db;