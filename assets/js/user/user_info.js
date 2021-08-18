$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return '名称字符长度必须在 1~6 之间'
        }
    })

    initUserInfo();
    function initUserInfo() {
        $.ajax({
            type:"get",
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败');
                }
                renderUserInfo(res.data);
            }
        })
    }
    function renderUserInfo(data) {
        form.val("formUserInfo", data)
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败');    
                }
                layer.msg('更新用户成功');
                //调用页面的 重新渲染用户信息和头像
                window.parent.getUserInfo();
                console.log(res);
            }
        })
    })
})

