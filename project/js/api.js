"use strict";

/**
 * 请求api配置
 */
var m_api = {
  url_base: 'http://192.168.1.106:8080',
  img_base: 'http://192.168.1.106:8080',
  // img_base:'',
  // 请求 
  ajax: function ajax(op) {
    if (!op) {
      return;
    }

    $.ajax({
      type: "POST",
      url: op.url || '',
      data: op.data || '',
      success: function success(res) {
        op.success && op.success(res);
      },
      error: function error(err) {
        op.error && op.error(err);
      }
    });
  },
  // 登录
  login: function login(user_info, _success, _error) {
    var url = this.url_base + '/erp/include_work_PhoneWork';
    var data = {
      vaild_tag: '1',
      //(必填值固定)
      login_type: '1',
      //1:小程序
      openid: '',
      //小程序、公众号的唯一标识
      user_name: user_info.user_name,
      //登录账号
      user_pwd: user_info.user_pwd //密码

    };
    this.ajax({
      url: url,
      data: data,
      success: function success(res) {
        _success(res);
      },
      error: function error(err) {
        _error(err);
      }
    });
  },
  // 一般操作
  work: function work(data, _success, _error) {
    var url = this.url_base + '/erp/phone_sc_Action'; // 请求

    this.ajax({
      url: url,
      data: data,
      success: function success(res) {
        _success(res);
      },
      error: function error(err) {
        _error(err);
      }
    });
  }
};