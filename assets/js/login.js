$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    
    //从layui获取form

    var form = layui.form

    // 自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd (value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次输入的密码不同';
            }

        }
    })


    // 监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var obj = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', obj, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link_login').click();
        })

    })


    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // console.log(res.token);

                // 把数据存在 localStorage中
                localStorage.setItem('token', res.token);

                // 跳转到主页
                location.href = '/index.html'
            }
        })
    })


})

    