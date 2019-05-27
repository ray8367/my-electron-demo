"use strict";

/**
 * 加载商城底部导航
 */
(function () {
  // 加载导航
  var $mainNav = $('.m-main .main-nav');
  $mainNav.load('./main_nav.html', function () {
    // 设置当前导航指向
    var viewId = $('.m-main').attr('id');
    var navItem = $('.m-main .main-nav .nav-item');

    for (var i = 0; i < navItem.length; i++) {
      var navVien = navItem[i].getAttribute('data-view');

      if (navVien == viewId) {
        navItem[i].classList.add('active');
        break;
      }
    } // 导航切换时若所点击导航就是当前页面，取消跳转


    navItem.on('click', function () {
      if (viewId === this.getAttribute('data-view')) {
        return false;
      }
    });
  });
})();