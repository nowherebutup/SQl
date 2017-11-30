$(function () {

    // 渲染整体页面
    function initlist() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/books/',
            data: {},
            dataType: 'json',
            async: true,
            success: function (data) {
                var html = template('tbodytpl', { list: data });
                $('#tbody').html(html);
                $('#tbody').find('tr').each(function (index, item) {
                    var lasttd = $(item).find('td:eq(5)');
                    var id = $(item).find('td:eq(0)').text();
                    var aedit = lasttd.find('a:eq(0)');
                    aedit.click(function () {
                        editbook(id);
                    })
                });
                console.log(534351151);
                // console.log(edita);
                addbook();
                var form = $('#form');
                form[0].reset();
            }
        })
    }

    // 点击添加书籍事件
    function addbook() {
        $('#add').click(function () {
            var form = $('#form');
            var mask = new MarkBox(600, 300, '添加咯', form.get(0));
            mask.init();
            $('input[type=button]').click(function () {
                var adddata = form.serialize();
                console.log(adddata);
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:3000/books/book',
                    data: adddata,
                    dataType: 'json',
                    success: function (data) {
                        // console.log(data);
                        mask.close();
                        initlist();
                    }
                })
            })

        })
    }

    // 点击修改书籍并且提交事件;
    function editbook(id) {
        var form = $('#form');
        var mask = new MarkBox(600, 400, '编辑咯', form.get(0));
        // 从数据库获取数据,渲染编辑页面;
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (result) {
                form.find('input[name="id"]').val(result.id);
                form.find('input[name="name"]').val(result.name);
                form.find('input[name="author"]').val(result.author);
                form.find('input[name="category"]').val(result.category);
                form.find('input[name="description"]').val(result.description);
                mask.init();
                form.find('input[type="button"]').click(function () {
                    var editddd = form.serialize();
                    console.log(editddd);
                    $.ajax({
                        type: 'put',
                        data: editddd,
                        url: '/books/book',
                        dataType: 'json',
                        success: function (result) {
                            mask.close();
                            initlist();
                        }
                    })
                });
            }
        });
    }

    initlist();













})