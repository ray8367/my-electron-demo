"use strict";

(function () {
  var register = {
    memberNameipt: document.querySelector('input[name="memberNameipt"]'),
    //姓名
    phoneIpt: document.querySelector('input[name="phoneIpt"]'),
    //手机号
    pswordIpt: document.querySelector('input[name="pswordIpt"]'),
    //密码
    rePswordIpt: document.querySelector('input[name="rePswordIpt"]'),
    //确认密码
    introducerPhoneIpt: document.querySelector('input[name="introducerPhoneIpt"]'),
    //介绍人手机号
    birthdayIpt: document.querySelector('input[name="birthdayIpt"]'),
    //生日
    checkCodeIpt: document.querySelector('input[name="checkCodeIpt"]'),
    //验证码输入
    checkCodeBox: document.getElementsByClassName('check-code-box')[0],
    //验证码
    registerSubmit: document.getElementsByClassName('register-submit')[0],
    // 注册按钮
    registerForm: document.getElementsByClassName('register-form')[0],
    // 注册按钮

    /**注册请求 */
    registerRequest: function registerRequest(user_info) {
      var _this = this;

      var phone = user_info.phone,
          member_name = user_info.member_name,
          user_pwd = user_info.user_pwd,
          sex = user_info.sex,
          birthday = user_info.birthday,
          phone2 = user_info.phone2;
      var request_info = {
        TYPE: 'phone_register_login',
        //(必填值固定)
        phone: phone,
        //手机号(登录账号)
        member_name: member_name,
        //会员姓名
        user_pwd: user_pwd,
        //登录密码
        sex: sex,
        //性别
        birthday: birthday,
        //生日号
        work_order: this.getWork_order(),
        //单号
        phone2: phone2,
        //介绍人手机号
        openid: '',
        //微信opendid
        login_type: '1' //1 代表小程序

      };
      console.log(request_info);
      m_api.work(request_info, function (res) {
        // console.log(res)
        if (res.status) {
          userTip('注册成功!', 'success');
          window.location.href = './login.html';
        } else {
          console.log(res);
          userTip(res['errMsg'], 'error');
        }

        _this.registerSubmit.innerHTML = '注册';
      }, function (err) {
        console.log(err);
        _this.registerSubmit.innerHTML = '注册';
      });
    },

    /**生成单号 */
    getWork_order: function getWork_order() {
      var nowT = new Date(),
          year = nowT.getFullYear(),
          month = nowT.getMonth() + 1,
          date = nowT.getDate(),
          hours = nowT.getHours(),
          min = nowT.getMinutes(),
          sec = nowT.getSeconds(),
          msec = nowT.getMilliseconds();
      month = month < 10 ? '0' + month : month;
      hours = hours < 10 ? '0' + hours : hours;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      msec = msec < 100 ? '0' + msec : msec;
      msec = msec < 10 ? '0' + msec : msec;
      return "" + year + month + date + hours + min + sec + msec + random(10);
    },
    init: function init() {
      var _this2 = this;

      // 导航高
      var headerNav = document.getElementsByClassName('m-header')[0];
      var navH = headerNav.offsetHeight;

      window.onscroll = function () {
        scrollTopTargetHide(headerNav, navH);
      }; // 验证码


      var vc_code = new VerificationCode(this.checkCodeBox); // 更新验证码

      this.checkCodeBox.onclick = function () {
        vc_code.refresh();
      }; // 注册按钮


      this.registerForm.onsubmit = function (e) {
        stopDefault(e);

        var member_name = _this2.memberNameipt.value.trim(),
            phone = _this2.phoneIpt.value.trim(),
            user_pwd = _this2.pswordIpt.value.trim(),
            reUser_pwd = _this2.rePswordIpt.value.trim(),
            sex = $('input[name="sex"]:checked').val(),
            phone2 = _this2.introducerPhoneIpt.value.trim(),
            birthday = _this2.birthdayIpt.value.trim(),
            checkCode = _this2.checkCodeIpt.value.trim();

        if (!member_name) {
          userTip('请输入姓名', 'error');
        } else if (!phone) {
          userTip('请输入手机号码', 'error');
        } else if (!user_pwd) {
          userTip('请输入密码', 'error');
        } else if (user_pwd !== reUser_pwd) {
          console.log('不一致');
          userTip('密码输入不一致，请重试', 'error');
        } else if (!vc_code.validate(checkCode)) {
          userTip('请输入正确的图形验证码', 'error');
          _this2.checkCodeIpt.value = '';
        } else {
          _this2.registerSubmit.innerHTML = '注册中,请稍等..';

          _this2.registerRequest({
            phone: phone,
            member_name: member_name,
            user_pwd: user_pwd,
            sex: sex,
            birthday: birthday,
            phone2: phone2
          });
        }
      };
    }
  };
  register.init();
})();