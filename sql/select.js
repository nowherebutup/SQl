let common = require('./common.js');

let sql = 'select * from nodedata where id=?';
let data = [5];

common.method(sql, data, (res) => {
    console.log(res[0].name);
})