"use strict";

(function () {
  var change_psword = {
    phoneIpt: document.getElementById('phoneIpt'),
    pswordIpt: document.getElementById('pswordIpt'),
    rePswordIpt: document.getElementById('rePswordIpt'),
    checkCodeIpt: document.getElementById('checkCodeIpt'),
    checkCodeBox: document.getElementById('checkCodeBox'),
    messageIpt: document.getElementById('messageIpt'),
    messageBox: document.getElementById('messageBox'),
    // 下一步
    identityCheckForm: document.getElementsByClassName('identity-check-form')[0],
    // 完成
    pswordResetForm: document.getElementsByClassName('psword-reset-form')[0],
    // 修改
    // 短信验证码
    getMessageCode: function getMessageCode() {
      console.log('短信验证码获取成功');
      return 1;
    },
    // 身份验证
    IdentityVerification: function IdentityVerification(user_info, success, error) {
      console.log(user_info);
      setTimeout(function () {
        success();
      }, 2000);
    },
    // 密码重置
    goPsWordReset: function goPsWordReset(user_password, success, error) {
      console.log(user_password);
      setTimeout(function () {
        success();
      }, 3000);
    },
    init: function init() {
      var _this = this;

      // 导航高
      var headerNav = document.getElementsByClassName('m-header')[0];
      var navH = headerNav.offsetHeight;

      window.onscroll = function () {
        scrollTopTargetHide(headerNav, navH);
      }; // 生成随机验证码
      // 验证码


      var vc_code = new VerificationCode(this.checkCodeBox); // 更新验证码

      this.checkCodeBox.onclick = function () {
        vc_code.refresh();
      }; // 获取短信验证码点击


      this.messageBox.onclick = function () {
        if ($(_this.messageBox).hasClass('disable')) {
          return;
        }

        var phone = _this.phoneIpt.value.trim();

        var checkCodeIpt = _this.checkCodeIpt.value.trim();

        var msgFeedback = document.getElementsByClassName('msg-feedback')[0];

        if (!checkPhone(phone)) {
          // 验证手机号格式
          userTip('请输入正确的手机号码', 'error');
        } else if (!vc_code.validate(checkCodeIpt)) {
          // 随机验证码验证
          userTip('请输入正确的图形验证码', 'error');
        } else {
          // 获取短信验证码
          if (_this.getMessageCode(phone)) {
            // 短信发送成功，修改状态
            msgFeedback.style.opacity = 1;

            _this.messageBox.classList.add('disable'); // 进入倒计时


            var timeEnd = 10; //60秒1次

            var count = timeEnd;
            _this.messageBox.innerHTML = count + 's后重新获取';
            var timer = setInterval(function () {
              console.log(666);
              count--;
              this.messageBox.innerHTML = count + 's后重新获取';

              if (count <= 0) {
                clearInterval(timer);
                this.messageBox.innerHTML = '获取验证码';
                this.messageBox.classList.remove('disable');
                msgFeedback.style.opacity = 0;
              }
            }, 1000);
          }
        }
      }; // 下一步


      this.identityCheckForm.onsubmit = function (e) {
        stopDefault(e); // 手机号

        var phone = _this.phoneIpt.value.trim(); // 验证码


        var checkCodeIpt = _this.checkCodeIpt.value.trim(); // 短信验证码


        var messageIpt = _this.messageIpt.value.trim();

        if (!checkPhone(phone)) {
          // 验证手机号格式
          userTip('请输入正确的手机号码', 'error');
        } else if (!vc_code.validate(checkCodeIpt)) {
          // 随机验证码验证
          userTip('请输入正确的图形验证码', 'error');
        } else if (!messageIpt) {
          userTip('请输入短信验证码', 'error');
        } else {
          //    身份验证
          _this.IdentityVerification({
            phone: phone,
            messageIpt: messageIpt
          }, function (res) {
            console.log('切换至重置密码...');
            $('.identity-check').hide();
            $('.psword-reset').show();
            $('.m-h-center').html('修改密码');
          });
        }
      }; // 完成点击


      this.pswordResetForm.onsubmit = function (e) {
        stopDefault(e);

        var password = _this.pswordIpt.value.trim();

        var rePsword = _this.rePswordIpt.value.trim();

        if (!password) {
          userTip('请输入新密码', 'error');
        } else if (!rePsword) {
          userTip('请输入确认密码', 'error');
        } else if (password !== rePsword) {
          userTip('密码输入不一致，请重试', 'error');
        } else {
          _this.goPsWordReset(password, function (res) {
            console.log(res);
          });
        }
      };
    }
  };
  change_psword.init();
})();