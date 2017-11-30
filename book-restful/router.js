const express = require('express');
const service = require('./service.js');
const router = express.Router();

// 提供所有图书信息
router.get('/books', service.allbooks);
// 编辑图书,根据id,查询相应信息;
router.get('/books/book/:id', service.getbookbyid);
// 添加图书信息提交 数据
router.post('/books/book', service.addbook)
// 提交编辑信息
router.put('/books/book', service.editbook)
// 删除制定id的图书;
router.delete('/books/book/:id', service.deletebook);

module.exports = router;