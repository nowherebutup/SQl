// 1.导入数据库;
var mysql = require('mysql');

// 2.创建数据库连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsbook'
});
// 3.执行连接
connection.connect();
// 4.操作数据库
let sql = 'delete from nodedata where id=?'
let data = [6]
connection.query(sql, data, function (err, res, files) {
    console.log(res);
})

// 5.关闭连接
connection.end();