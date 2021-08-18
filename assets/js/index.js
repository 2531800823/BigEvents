$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo();
    $('#btnLogout').on('click', function () {
        layer.confirm('确认要退出?', {icon: 3, title:'提示'}, function(index){
            // 登录成功的反方向
            // 清空本地存储
            localStorage.removeItem('token');
            location.href = '/login.html';
            //关闭提示框
            layer.close(index);
        });   
    })
    
})
function getUserInfo(){
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        
        success(res) {
            if (res.status !== 0)
                return layer.msg('获取用户信息失败');
            // 渲染用户头像
            renderAvatar(res.data);
        },
        
    })
    
}

// 渲染用户头像
function renderAvatar(user) {
    //获取name
    var name = user.nickname || user.username;
    
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}
