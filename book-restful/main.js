let express = require('express');
let app = express();
let router = require('./router.js');
let bodyparser = require('body-parser');

app.use('/www', express.static('views'));
// 处理form表单传递过来的数据;
app.use(bodyparser.urlencoded({ extended: false }));
// 使用路由;
app.use(router);

app.listen(3000, () => {
    console.log('发射...666');
})