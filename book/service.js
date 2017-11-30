let data = require('./data.json');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const app = express();
// --------------------不知道app.use用body-parser最好写在哪儿

// 渲染主页面
exports.show = (req, res) => {
    res.render('index', {
        list: data
    });
}

// 渲染添加页面
exports.toaddbook = (req, res) => {
    res.render('addBook', {});
}

// 处理前端发来的添加图书的数据
exports.addbook = (req, res) => {
    let idarr = [];
    let maxid = 0;
    data.forEach(function (item, index) {
        idarr.push(parseInt(item.id));
    })
    // 找数据库中id最大的
    maxid = Math.max.apply(null, idarr);
    maxid++;
    app.use(bodyparser.urlencoded({ extended: false }));
    let adddata = req.body;
    // adddata = { name: 'a', author: 'a', category: 'a', desc: 'a' }
    // 将新加入的数据,赋值最大(id+1) 给它;
    adddata.id = String(maxid);
    data.push(adddata);
    // 将数据写入数据库;
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), 'utf8', (err) => {
        if (err) {
            res.send('server error');
            return;
        }
        console.log('写入数据库成功');
    })
    res.redirect('/');
}

// 渲染编辑页面
exports.toeditbook = (req, res) => {
    let id = req.query.id;
    let book = {};
    data.forEach((item) => {
        if (id == item.id) {
            book = item;
            return;
        }
    })
    res.render(path.join(__dirname, 'static', 'editbook.art'), book);
}

// 将传来编辑好的数据写入=>后台数据
exports.editbook = (req, res) => {
    let id = req.body.id;
    let editdata = req.body;
    data.forEach((item) => {
        if (item.id == id) {
            for (let key in editdata) {
                item[key] = editdata[key];
            }
            fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), 'utf8', () => {
                console.log('编辑成功');
            })
            return;
        }
    })
    res.redirect('/');
}

// 处理删除的操作
exports.deletebook = (req, res) => {
    let id = req.query.id;
    console.log(id);
    data.forEach((item, index) => {
        if (item.id == id) {
            data.splice(index, 1);
            fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), 'utf8', () => {
                console.log('删除成功');
            });
            return;
        }
    })
    res.redirect('/');
}






