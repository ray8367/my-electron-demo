"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") { _typeof = function (_typeof2) { function _typeof(_x) { return _typeof2.apply(this, arguments); } _typeof.toString = function () { return _typeof2.toString(); }; return _typeof; }(function (obj) { return typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } else { _typeof = function (_typeof3) { function _typeof(_x2) { return _typeof3.apply(this, arguments); } _typeof.toString = function () { return _typeof3.toString(); }; return _typeof; }(function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } return _typeof(obj); }

(function () {
  window.onload = function () {
    // 高度控制
    var bodyH = getDomScroll().height;
    var main = document.querySelector('.m-main');
    main && (main.style.height = bodyH + 'px');
  };
})();

function getLoginState() {
  if (localStorage.getItem('user_info')) {
    return JSON.parse(localStorage.getItem('user_info'));
  } else {
    return false;
  }
}
/* 加载中
 *  option:
 *   msg - 提示信息
 *   el - 父元素 ， 默认body
 *   偏移量 - left ， top 默认居中   
 */


function m_loading(op) {
  var loadingPage = document.getElementsByClassName('m-loading');

  if (loadingPage.length >= 1) {
    return;
  }

  var msg = '加载中,请稍后...',
      main = document.getElementsByTagName('body')[0];

  if (op) {
    op.msg && (msg = op.msg);
    op.el && (main = op.el);
  }

  var loadingNode = document.createElement('div');
  main.style.position = 'relative';
  loadingNode.classList.add('m-loading');
  loadingNode.innerHTML = "\n        <div class=\"loading-inner\">\n\t    <div class=\"loading-ico dot-spin\"></div>\n        <p class=\"loading-label\">" + msg + "</p>\n        </div>\n    ";
  main.appendChild(loadingNode);
}
/*加载完毕*/


function m_loadEnd() {
  var loadingPage = document.getElementsByClassName('m-loading')[0];

  if (loadingPage == null) {
    return;
  }

  loadingPage.parentNode.removeChild(loadingPage);
}
/**
 * @param {String} msg 提示信息
 * @param {String} op.className 自定义样式 
 * @param {String/int} op.removeTime 消失延时 
 */


function m_alert(msg, op) {
  // 在body中生成一个m_alert
  var pageALertNode = document.getElementsByClassName('m-alert');

  if (pageALertNode.length > 0) {
    // 页面内存在alert时触发无效
    return;
  }

  var body = document.getElementsByTagName('body')[0];
  var alertNode = document.createElement('p');
  var removeTime = 2000;
  alertNode.classList.add('m-alert');
  alertNode.innerHTML = msg;
  body.appendChild(alertNode);

  if (op) {
    if (op.className) {
      alertNode.classList.add(op.className);
    }

    removeTime = parseInt(op.removeTime) || removeTime;
  } // 指定时间后后自动移除


  setTimeout(function () {
    removeAlert(alertNode, 300);
  }, removeTime); // 移除alert

  function removeAlert(target, delay) {
    // 先隐藏
    target.style.transition = 'opacity ' + delay + 'ms';
    target.style.opacity = '0'; // 再移除

    target.addEventListener('transitionend', function () {
      target.parentNode.removeChild(target);
    });
  }
}
/**
 * 基于m_alert 用户提示
 * @param {String} msg 
 */


function userTip(msg, type) {
  if (!(typeof m_userTip === "undefined" ? "undefined" : _typeof(m_userTip))) {
    return;
  }

  type = type || 'info';

  switch (type) {
    // 普通信息
    case 'info':
      {
        m_alert(msg, {
          className: 'm-alert-info'
        });
        break;
      }
    // 成功信息

    case 'success':
      {
        m_alert(msg, {
          className: 'm-alert-success'
        });
        break;
      }
    // 错误提示

    case 'error':
      {
        m_alert(msg, {
          className: 'm-alert-error'
        });
        break;
      }

    default:
      {
        m_alert(msg);
      }
  }
}
/**
 * 确认提示
 * @param {String} msg 提示信息
 * @param {Function} sureCallback 确认回调
 */


function m_confirm(msg, sureCallback) {
  // 在body中生成一个m_confirm
  var pageConfirmNode = document.getElementsByClassName('m-confirm');

  if (pageConfirmNode.length > 0) {
    return;
  }

  var body = document.getElementsByTagName('body')[0];
  var confirmNode = document.createElement('div');
  confirmNode.classList.add('m-confirm', 'm-mark');
  confirmNode.innerHTML = "\n        <div class=\"m-confirm-box\">\n            <div class=\"confirm-content\">\n                " + msg.toString() + "\n            </div>\n            <div class=\"confirm-bottom\">\n                <div class=\"item close\">\u53D6\u6D88</div>\n                <div class=\"item sure\">\u786E\u8BA4</div>\n            </div>\n        </div>\n    ";
  body.appendChild(confirmNode);
  var sure = document.querySelector('.m-confirm .sure');
  var close = document.querySelector('.m-confirm .close');
  sure.addEventListener('click', function () {
    if (sureCallback) {
      sureCallback();
    }

    removeConfirm(confirmNode);
  });
  close.addEventListener('click', function () {
    removeConfirm(confirmNode);
  }); // 移除

  function removeConfirm(target) {
    // 先隐藏
    target.style.transition = 'opacity 500ms';
    target.style.opacity = '0';
    target.addEventListener('transitionend', function () {
      target.parentNode.removeChild(target);
    });
  }
}
/**返回上一级, 若无上一级返回首页*/


function goBack() {
  console.log('hehe');

  if (document.referrer == '') {
    window.location.href = './index.html';
  } else {
    window.history.back();
  }
}
/**获取屏幕宽高 */


function getScreen() {
  return {
    width: window.screen.width,
    height: window.screen.height
  };
}
/**
 * 阻止事件默认行为
 * @param {*} e enent
 */


function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }

  return false;
}
/** 获取网页正文全文宽高（包括滚动条卷去的） */


function getDomScroll() {
  return {
    width: document.body.scrollWidth,
    height: document.body.scrollHeight
  };
}
/**tab切换一般模式 (切换修改样式) */


function tabActive($tab_switch, $tab_cont, class_name) {
  $tab_switch.on('click', function () {
    $tab_switch.removeClass(class_name);
    $tab_cont.removeClass(class_name);
    $(this).addClass(class_name);
    $tab_cont.eq($(this).index()).addClass(class_name);
  });
}
/**返回顶部 */


function goTop() {
  window.scrollTo(0, 0);
}
/**判断当前设备是否为iOS */


function iOSVersion() {
  var u = navigator.userAgent;
  return u.match(/(iPhone|iPod|iPad);?/i);
}
/**
 * 一键复制
 * @param {*} node 要复制的内容
 */


function copyText(node) {
  if (!node) {
    return;
  }

  var result; // 将复制内容添加到临时textarea元素中

  var tempTextarea = document.createElement('textarea');
  document.body.appendChild(tempTextarea); // 文本或数字

  if (typeof node === 'string' || typeof node === 'number') {
    console.log('string || number'); // 直接复制文本

    tempTextarea.value = node;
  } else {
    // 复制节点中内容
    // 是否表单
    if (node.value) {
      tempTextarea.value = node.value;
    } else if (node.innerHTML) {
      tempTextarea.value = node.innerHTML;
    } else {
      result = 0;
      return;
    }
  } // 判断设备


  if (iOSVersion()) {
    // iOS
    // 移除已选择的元素
    window.getSelection().removeAllRanges(); // 创建一个Range对象

    var range = document.createRange(); // 选中

    range.selectNode(tempTextarea); // 执行选中元素

    window.getSelection().addRange(range); // 复制

    result = document.execCommand('copy'); // 移除选中元素

    window.getSelection().removeAllRanges();
  } else {
    // 选中    
    tempTextarea.select(); // 复制

    result = document.execCommand('Copy');
  } // 移除临时文本域


  document.body.removeChild(tempTextarea);

  if (result) {
    m_alert('复制成功', {
      removeTime: 1000
    });
  } else {
    m_alert('复制失败', {
      removeTime: 1000
    });
  }

  return result;
}
/**
 * 随机生成指定长度的数字字符串
 * @param {Int/String} len 
 */


function randomNumStr(len) {
  len = len.toString() || 0;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += Math.floor(Math.random() * 10);
  }

  return str;
} // 随机验证码


function VerificationCode(el) {
  this.size = 4; // 验证

  this.code = '';

  this.validate = function (target) {
    return target === this.code;
  }; // 生成


  this.refresh = function () {
    var tempNode = null;
    this.el.innerHTML = '';
    this.code = '';

    for (var i = 0; i < this.size; i++) {
      tempNode = document.createElement('em');
      var item = random(10);
      tempNode.innerHTML = item; // 随机颜色

      tempNode.style.color = 'rgb(' + random(0, 160) + ',' + random(0, 160) + ',' + random(0, 160) + ')'; // 旋转

      tempNode.style.transform = 'rotate(' + random(-50, 50) + 'deg)'; // 字体大小

      tempNode.style.fontSize = random(12, 20) + 'px'; // 粗细

      tempNode.style.fontWeight = random(200, 800);
      this.el.appendChild(tempNode);
      this.code += item;
    }
  }; // 初始化


  this.init = function () {
    if (!el) {
      return;
    }

    this.el = el;
    this.refresh();
  };

  this.init();
}
/**
 * 范围内随机数
 * @param {Number} min 
 * @param {*} max Number
 */


function random(min, max) {
  var num = 0;

  if (max) {
    // min - max
    num = Math.floor(Math.floor(Math.random() * (max - min + 1) + min));
  } else if (min) {
    // 0 - min 
    num = Math.floor(Math.floor(Math.random() * min));
  }

  return num;
}
/**
 * 多选按钮组
 * @param {String} checkItemSelector 复选按钮选择器
 * @param {String} checkAllId 全选按钮ID
 * @param {Function} option.checkHand   单选回调
 * @param {Function} option.checkAllHand    全选回调
 */


function SelectGroup(checkItemSelector, checkAllId, option) {
  this.checkItem = document.querySelectorAll(checkItemSelector);
  this.checkAll = document.getElementById(checkAllId);
  this.option = option; // 是否全选

  this.ischeckAll = function () {
    // 全选判断
    var all_flag = 1;

    for (var i = 0; i < this.checkItem.length; i++) {
      if (!this.checkItem[i].checked) {
        // 未全选状态
        all_flag = 0;
        break;
      }
    }

    return all_flag;
  }; // 选择


  this.init = function () {
    // 单项选择
    var _this = this;

    for (var i = 0; i < this.checkItem.length; i++) {
      (function (i) {
        _this.checkItem[i].onchange = function () {
          // 选择回调
          console.log('复选框个数：' + _this.checkItem.length);

          if (_this.option) {
            if (_this.option.checkHand) {
              _this.option.checkHand();
            }
          } // 全选判断


          if (_this.ischeckAll()) {
            _this.checkAll.checked = true;
          } else {
            _this.checkAll.checked = false;
          }
        };
      })(i);
    } // 全选


    this.checkAll.onclick = function () {
      var checkState = this.checked;
      console.log(checkState);

      for (var i = 0; i < _this.checkItem.length; i++) {
        _this.checkItem[i].checked = checkState;
      } // 全选回调


      if (_this.option) {
        _this.option.checkAllHand();
      }
    };
  };

  this.init();
}
/**
 * 验证手机号格式
 * @param {String} tel 
 */


function checkPhone(tel) {
  var flag = 1;
  var TEL_REGEXP = /^[1]([3-9])[0-9]{9}$/;

  if (!tel) {
    return 0;
  }

  if (!TEL_REGEXP.test(tel)) {
    flag = 0;
  }

  return flag;
}
/**
 * 验证密码格式
 * @param {String} pswordStr 
 */


function checkPsword(pswordStr) {
  var flag = 1; // 由6-18位数字字母以及下划线组成

  var PS_WORD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;

  if (!pswordStr) {
    return 0;
  }

  if (!PS_WORD.test(pswordStr)) {
    flag = 0;
  }

  return flag;
}
/**
 * 防抖（只执行触发的或最后一次）
 * @param {Function} fun 执行的函数
 * @param {Number} wait 等待时间
 */


function debounce(fun, wait) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fun, wait);
  };
}
/**
 * 节流（在一段时间内无论触发多少次只执行一次）
 * @param {Function} fun 执行的函数
 * @param {Number} wait 等待时间
 */


function throttle(fun, wait) {
  var timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        fun();
        timeout = null;
      }, wait);
    }
  };
}
/**
 * 空白处事件执行（点击，滑动等）
 * @param {Function} fun 执行的函数
 * @param {Array} event 触发事件
 * @param {String} arguments[2,...] 需要忽略的区域选择器
 */


function clickBlank(fun, event) {
  var _arguments = arguments;

  if (!event) {
    return;
  }

  $(document).on(event.join(' '), function (e) {
    var flag = 1;

    for (var i = 2; i < _arguments.length; i++) {
      var $ignore = $(_arguments[i]);

      if ($ignore.has(e.target).length !== 0 || $ignore[0] === e.target) {
        flag = 0;
        break;
      }
    }

    if (flag) {
      fun();
    }
  });
}
/**
 * 滚动高度范围内隐藏
 * @param {Object Ele} el 
 * @param {Number} targetH 
 */


function scrollTopTargetHide(el, targetH) {
  var top = document.body.scrollTop || document.documentElement.scrollTop;

  if (top >= targetH) {
    el.style.opacity = 0;
  } else {
    el.style.opacity = 1;
  }
}
/**
 * 获取链接中的查询条件
 * @param {String} target 查询条件
 */


function getQueryString(target) {
  var reg = new RegExp("(^|&)" + target + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}