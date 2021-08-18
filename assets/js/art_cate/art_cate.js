
$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0)
                    return layer.msg('获取内容失败');
                var str = template('tpl-table', res);
                $('tbody').html(str);
                
            }
        })
    }

    var indexAdd = null
    $('#btnAddCate').on('click', function (e) {
        indexAdd=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });   
    })


    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0)
                    return layer.msg('新增分类失败');
                initArtCateList();  
                 layer.msg('新增分类成功');
                layer.close(indexAdd);
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function (e) {
        indexEdit=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'get',
            url: "/my/article/cates/"+id,
            success(res) {
                if (res.status !== 0)
                    return layer.msg('新增分类失败');
                layui.form.val('form-edit', res.data);
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0)
                    return layer.msg('新增分类失败');
                layer.msg('新增分类成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success(res) {
                    if (res.status !== 0)
                    return layer.msg('新增分类失败');
                initArtCateList();  
                }
            })

            layer.close(index);
          });
    })

})