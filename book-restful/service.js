const common = require('./common.js');

// 获取到所有的图书信息
exports.allbooks = (req, res) => {
    let sql = 'select * from book';
    common.method(sql, null, (result) => {
        res.json(result);
    })
}

// 获取指定id 的图书信息
exports.getbookbyid = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from book where id=?';
    let data = [id];
    common.method(sql, data, (result) => {
        res.json(result[0]);
    })
}

// 添加图书信息到数据库里面;
exports.addbook = (req, res) => {
    let info = req.body;
    console.log(789);
    console.log(info);
    let sql = 'insert into book set ?';
    common.method(sql, info, (result) => {
        res.json({ flag: 1 });
        // console.log(result);
        // if (result.affectedRows == 1) {
        //     res.json({ flag: 1 });
        // }
        // else {
        //     res.json({ flag: 2 });
        // }
    })
}

// 更新制定id的图书信息;
exports.editbook = (req, res) => {
    let info = req.body;
    let sql = 'update book set name=? ,author=?, category=?, description=? where id =?'
    console.log(info);
    let data = [info.name, info.author, info.category, info.description, info.id];
    common.method(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({ flag: 1 });
        }
        else {
            res.json({ flag: 2 });
        }
    })
}

// 删除指定id的图书信息;
exports.deletebook = (req, res) => {
    let id = req.params.id;
    let sql = 'delete from book where id=?'
    let data = [id];
    common.method(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({ flag: 1 });
        }
        else {
            res.json({ flag: 2 });
        }
    })
}