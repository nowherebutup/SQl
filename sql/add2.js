let obj = require('./common.js');
let sql = 'insert into nodedata set ?';
let data = {
    name: 'qqqqq',
    author: 'qqqqq',
    category: 'qqqqq',
    description: 'qqqqq'
}
obj.method(sql, data, (a) => {
    console.log(sql);
    console.log(data);
})