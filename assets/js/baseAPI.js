// 每次调用 $.get $.post $.ajax 都会先调用这个

$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //判断有 my 要统一给有权限的添加请求头
    if (options.url.indexOf('/my/') != -1) {
    options.headers={ Authorization: localStorage.getItem('token')||''}
    }

    options.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！")
        {
            localStorage.removeItem('token');
            location.href='/login.html'
        }
    }
})