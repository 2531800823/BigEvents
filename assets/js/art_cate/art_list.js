$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state:'',
        
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    var laypage = layui.laypage;

    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = dt.getMinutes()+1;
        var d = dt.getDate();

        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();



        return y + '-' + padZero(m) + '-' + padZero(d) + ' ' + padZero(hh) + ':' +
            padZero(mm) + ':' +padZero(ss);
    }


    initCate()
    initTable()
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success(res) {
                if (res.status !== 0)
                    return layer.msg('新增分类失败');
                
                let str = template('tpl-table', res)
                $('tbody').html(str);
                renderPage(res.total)

            }
        })
    }
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0)
                    return layer.msg('新增分类失败');
                
                let str = template('tpl-cate', res)
                $('[name=cate_id]').html(str);
                layui.form.render();
            }
        })
    }


    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id
        q.state = state

        initTable();
    })


    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: 7, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示几条
            curr:q.pagenum,     //默认选中那一页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits:[2,3,5,10],
            jump(obj ,first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable();
                }
            },
        });
    }


    $('tbody').on('click', ".btn-delete", function (e) {

        var len = $('btn-delete').length

        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){

            var id = $(this).attr('data-id')
            $.ajax({
                type:'get',
                url: '/my/article/delete/' + id,
                success(res) {
                    if (res.status !== 0)
                        return layer.msg('删除失败');
                    layer.msg('删除成功');
                    // 判断当前页是有还有数据没有页码-1 获取页面的删除的按钮有几个
                    if (len === 1) { 
                        q.pagenum === 1 ? 1 : q.pagenum -= 1;
                    }
                    initTable();
                }
            })
            
            layer.close(index);
          });

    })
})