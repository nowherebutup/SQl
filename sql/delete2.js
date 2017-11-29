let common = require('./common.js');

let sql = 'delete from nodedata where id=?'
let data = [9]


common.method(sql, data, () => {
    console.log('删除成功');
})