"use strict";

(function () {
  var customerServe = {
    // 展开、关闭
    setTypeList: function setTypeList() {
      var $list_content = $('#problemTypeList');
      var openClass = 'open';
      $list_content.on('click', '.pro-type-title', function () {
        // 展开当前项同时隐藏其他项
        if (!$(this).hasClass(openClass)) {
          //关闭其他,并移除其他项中拥有的标记
          $(this).parent('.pro-type-item').siblings().find('.pro-type-title').removeClass(openClass);
          $(this).parent('.pro-type-item').siblings().find('.pro-list').removeClass(openClass);
        } // 添加或移除自身的标记


        $(this).toggleClass(openClass); // 展开或取消展开自身

        $(this).next().toggleClass(openClass);
      });
    },
    // 问候语
    getTimeText: function getTimeText() {
      var hour = new Date().getHours();

      if (hour < 6) {
        return "凌晨好！";
      } else if (hour < 9) {
        return "早上好！";
      } else if (hour < 12) {
        return "上午好！";
      } else if (hour < 14) {
        return "中午好！";
      } else if (hour < 17) {
        return "下午好！";
      } else if (hour < 19) {
        return "傍晚好！";
      } else if (hour < 22) {
        return "晚上好！";
      } else {
        return "夜深了!";
      }
    },
    init: function init() {
      // 根据时间修改问候语
      // 展开/关闭问题类型列表 
      var timeText = document.getElementById('timeText');
      timeText.innerHTML = this.getTimeText();
      this.setTypeList();
    }
  };
  customerServe.init();
})();