const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const app = express();
const common = require('./common.js');

// 渲染主页面
let renderindex = (res) => {
    let sql = 'select * from book';
    common.method(sql, null, (result) => {
        res.render('index', {
            list: result
        })
    })
}

// 渲染主页面;
exports.show = (req, res) => {
    renderindex(res);
}

// 渲染添加页面
exports.toaddbook = (req, res) => {
    res.render('addBook', {});
}

// 处理前端发来的添加图书的数据
exports.addbook = (req, res) => {
    app.use(bodyparser.urlencoded({ extended: false }));
    let adddata = req.body;
    let sql = 'insert into book set ?';
    let data = adddata;
    common.method(sql, data, (result) => {
        if (result.affectedRows == 1) {
            console.log('添加成功');
        }
        else {
            console.log('添加失败');
        }

    })
    // adddata = { name: 'yyyyyyyyyy',author: 'yyyyyyyyyy',category: 'yyyyyyyyyy',description: 'yyyyyyyyyy' }
    res.redirect('/');
}

// 渲染编辑页面
exports.toeditbook = (req, res) => {
    let id = req.query.id;
    let sql = 'select * from book where id =?';
    let data = [id];
    common.method(sql, data, (result) => {
        // console.log(result);
        res.render(path.join(__dirname, 'static', 'editbook.art'), result[0]);
    });
}

// 将传来编辑好的数据写入=>后台数据
exports.editbook = (req, res) => {
    let id = req.body.id;
    let editdata = req.body;
    let sql = 'update book set name=?,author=?,category=?,description=? where id =?';
    let editeddata = [editdata.name, editdata.author, editdata.category, editdata.description, editdata.id];
    common.method(sql, editeddata, (result) => {
        if (result.affectedRows == 1) {
            console.log('编辑成功');
        }
        else {
            console.log('编辑失败');
        }
    })
    res.redirect('/');
}

// 处理删除的操作
exports.deletebook = (req, res) => {
    let id = req.query.id;
    console.log(id);
    let sql = 'delete from book where id =?';
    let data = [id];
    common.method(sql, data, (result) => {
        if (result.affectedRows == 1) {
            console.log('删除成功');
        }
        else {
            console.log('删除失败');
        }
        res.redirect('/');
    })
}






