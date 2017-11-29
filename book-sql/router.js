const express = require('express');
// 创建路由实例对象
let router = express.Router();
let service = require('./service.js');


// 渲染主页面
router.get('/', service.show);
// 渲染添加页面
router.get('/toAddBook', service.toaddbook)
// 处理向服务器发送的添加图书的数据
router.post('/addBook', service.addbook)
// 处理渲染编辑页面
router.get('/toeditbook', service.toeditbook);
// 处理向服务器发送的编辑图书的数据;
router.post('/editbook', service.editbook);
// 前端传来删除的id,
router.get('/deletebook', service.deletebook);









module.exports = router;