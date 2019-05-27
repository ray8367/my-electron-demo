"use strict";

(function () {
  var login = {
    userPhoneIpt: document.getElementById('userPhoneIpt'),
    pswordIpt: document.getElementById('pswordIpt'),
    checkCodeIpt: document.getElementById('checkCodeIpt'),
    checkCodeBox: document.getElementById('checkCodeBox'),
    loginSubmit: document.getElementsByClassName('login-submit')[0],
    loginForm: document.getElementsByClassName('login-form')[0],
    // 显示/隐藏密码
    showHidePsword: function showHidePsword() {
      var $pswordShow = $('#pswordShow');
      var $pswordIpt = $(this.pswordIpt);
      $pswordShow.on('click', function () {
        console.log(2121);

        if ($pswordIpt.attr('type') == 'password') {
          $pswordIpt.attr('type', 'text');
          $(this).removeClass('iconmima-hide');
          $(this).addClass('iconmima-show');
        } else {
          $pswordIpt.attr('type', 'password');
          $(this).removeClass('iconmima-show');
          $(this).addClass('iconmima-hide');
        }
      });
    },
    // 登录
    goLogin: function goLogin(user_info) {
      var submit = this.loginSubmit;
      submit.classList.add('ring');
      submit.innerHTML = '登录中..';
      m_api.login(user_info, function (res) {
        console.log(res);
        submit.classList.remove('ring');
        submit.innerHTML = '登录';

        if (res.status) {
          // 登录成功
          console.log('验证通过');
          sessionStorage.setItem('user_info', JSON.stringify({
            user_name: user_info.user_name
          }));
          window.location.href = '../person.html';
        } else {
          userTip(res.errMsg, 'error');
        }
      }, function (err) {
        submit.classList.remove('ring');
        submit.innerHTML = '登录';
        console.log(err);
        m_alert('系统错误');
      });
    },
    init: function init() {
      var _this = this;

      // 导航高
      var headerNav = document.getElementsByClassName('m-header')[0];
      var navH = headerNav.offsetHeight;

      window.onscroll = function () {
        scrollTopTargetHide(headerNav, navH);
      }; // 验证码


      var vc_code = new VerificationCode(this.checkCodeBox); // 更新验证码

      this.checkCodeBox.onclick = function () {
        vc_code.refresh();
      }; // 登录点击


      this.loginForm.onsubmit = function (e) {
        stopDefault(e);

        var user_name = _this.userPhoneIpt.value.trim();

        var user_pwd = _this.pswordIpt.value.trim();

        var checkCode = _this.checkCodeIpt.value.trim();

        if (!user_name) {
          userTip('用户名不能为空', 'error');
        } else if (!user_pwd) {
          userTip('密码不能为空', 'error');
        } else if (!vc_code.validate(checkCode)) {
          userTip('请输入正确的图形验证码', 'error');
          _this.checkCodeIpt.value = '';
        } else {
          _this.goLogin({
            user_name: user_name,
            user_pwd: user_pwd
          });
        }
      }; // 显示或隐藏密码


      this.showHidePsword();
    }
  };
  login.init();
})();