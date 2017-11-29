const template = require('art-template');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const router = require('./router.js');

// 启动服务器的静态资源文件
let server = app.use(express.static('static'));

// 设置模板引擎的路径
app.set('views', path.join(__dirname, 'static'));
// 设置模板引擎的后缀名
app.set('view engine', 'art');
// 使express兼容模板引擎
app.engine('art', require('express-art-template'));
// 处理请求参数
// form
app.use(bodyparser.urlencoded({ extended: false }));
// json
app.use(bodyparser.json());

// 配置路由
app.use(router);
// 启动服务器
// 监听端口
app.listen(3000, () => {
    console.log('发射......');
})