let common = require('./common.js');

let sql = 'update nodedata set name=?,author=?,category=?,description=? where id=?'
let data = ['bbbbb', 'bbbbb', 'bbbbb', 'bbbbb', 1]
common.method(sql, data, () => {
    console.log('改动成功');
})