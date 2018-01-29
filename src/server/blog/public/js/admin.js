var registerPage = {

    init: function () {

        this.bindEvent();
    },

    bindEvent: function () {

        var $registerBtn = $('#register');
        var $login = $("#login");
        var $logout = $('#logout');
        var $appId = $('#appId');
        var $deleteApp = $('.deleteApp');
        var $publish = $('#publishApp');

        $registerBtn.on('click', function () {

            $.ajax('/api/register', {

                type: 'post',
                data: {
                    username: $('input[name="username"]').val(),
                    password: $('input[name="password"]').val(),
                    repassword: $('input[name="repassword"]').val()
                }
            })
                .then(function (data) {

                    if (data.code != 0) {

                        alert(data.message);
                    } else {

                        window.location.href = "/admin/login"
                    }
                })
            return false;
        })

        $login.on('click', function () {

            $.ajax('/api/login', {

                method: 'post',
                data: {
                    username: $('input[name="username"]').val(),
                    password: $('input[name="password"]').val()
                }
            })
                .then(function (res) {

                    if (res.code == 0) {

                        window.location.href = "/admin/index"
                    } else {

                        alert(res.message);
                    }
                })

            return false;
        })

        $logout.on('click', function () {

            $.ajax('/api/logout', {})
                .then(function (res) {

                    if (res.code == 0) {

                        window.location.href = "/login"
                    }
                })
        })

        $appId.on('click', function () {

            var appName = $("input[name='appName']").val(),
                appId = $("input[name='appId']").val(),
                appSecret = $("input[name='appSecret']").val(),
                appTag = $("input[name='appTag']").val();

            if (appName == '') {

                alert('请填写小程序名称');
                return false;
            }

            if (appTag == '') {

                appTag = 0;
            }

            if (appId == '') {

                alert('请填写appId');
                return false;
            }

            if (appSecret == '') {

                alert('请填写appSecret');
                return false;
            }


            $.ajax('/admin/appIdAdd', {

                type: 'post',
                data: {
                    appName: appName,
                    appTag: appTag,
                    appId: appId,
                    appSecret: appSecret
                }
            })
                .then(function (data) {

                    if (data.code == 0) {

                        window.location.href = "/admin/appIdList"
                    } else {

                        alert(data.message);
                        window.location.reload();
                    }
                })


            return false;
        })

        $deleteApp.on('click', function (e) {

            var $target = $(e.target),
                id = $target.data('id');

            console.log(444)
            $.ajax('/admin/appIdDelete', {

                data: {
                    appId: id
                }
            })
                .then(function (data) {

                    if(data.code == 0){

                        window.location.reload();
                    } else {

                        alert(data.message);
                    }
                })
        })

        $publish.on('click', function () {

            $.ajax('/admin/publishApp')
                .then(function (data) {

                    if(data.code == 0) {

                        alert('小程序发布成功了，所有小程序可以获取access_token');
                    } else {

                        alert(JSON.stringify(data.message));
                    }
                })
        })
    }
}


registerPage.init()