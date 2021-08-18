
$(function () {
    


    initCate()
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0)
                return layer.msg('新增分类失败');
                var str = template('tpl-cate', res);
                $('[name=cate_id]').html(str);
                layui.form.render();
            }

       })
   }
// 初始化富文本编辑器
initEditor()


      // 1. 初始化图片裁剪器
      var $image = $('#image')
  
      // 2. 裁剪选项
      var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
      }
      
      // 3. 初始化裁剪区域
    $image.cropper(options)
    
    $('#btnChooseImage').on('click', function () {
        $("#coverFIle").click();
    })

    $('#coverFIle').on('change', function (e) {
        var files = e.target.files;
        if (files.length === 0)
            return
        
        var newImgURL = URL.createObjectURL(files[0]);
        $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
    })


    var art_state = '已发布';

    $('#btnSave2').on('click', function () {
        art_state ='草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();

        var fd = new FormData($(this)[0])

        fd.append('state', art_state)

        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            fd.append('cover_img',blob)
        })
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData:false,
            success:function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败');
                }
                console.log(res);
                layer.msg('发布文章成功');
                location.href='/art_cate/art_list.html'
            }
        })
    })
    
})
