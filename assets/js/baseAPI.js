// 每次调用 $.get $.post $.ajax 都会先调用这个

$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    
})