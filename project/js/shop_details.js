"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  // 锚点导航(滚动事件相关)
  var pointNav = {
    // 导航
    navNode: document.querySelector('.nav-top'),
    // navNode: document.querySelector('.m-header'),
    navItemNode: document.querySelectorAll('.nav-top a'),
    // 返回顶部 
    goTopNode: document.getElementById('goTop'),
    navLen: 0,
    // 界面
    page: [],
    // 界面顶部距离
    pageTop: 0,
    // 获取导航目标
    getNavTarget: function getNavTarget() {
      var tempLink = '';
      var tempDom = null;
      this.navLen = this.navItemNode.length;

      for (var i = 0; i < this.navLen; i++) {
        tempLink = this.navItemNode[i].getAttribute('data-link');
        tempDom = document.getElementById(tempLink);

        if (tempDom == null) {
          this.page.push({});
          console.warn('导航 ' + i + ' 引用有误');
          continue;
        }

        this.page.push({
          el: tempDom,
          top: tempDom.offsetTop || 0
        });
      }

      this.pageTop = this.page[0].top;
    },
    // 导航事件
    navSwitch: function navSwitch() {
      var _this = this;

      for (var i = 0; i < this.navLen; i++) {
        (function (i) {
          _this.navItemNode[i].onclick = function () {
            // 取消绑定滚动事件
            window.removeEventListener('scroll', _this.scrollEvent); // 切换显示界面

            _this.switchShowPage(i); // 切换导航样式


            _this.navSwitchStyle(i);
          };
        })(i);
      }
    },
    // 切换导航样式
    navSwitchStyle: function navSwitchStyle(index) {
      for (var i = 0; i < this.navLen; i++) {
        this.navItemNode[i].classList.remove('active');
      }

      this.navItemNode[index].classList.add('active');
    },
    // 切换显示界面
    switchShowPage: function switchShowPage(index) {
      var targetH = this.page[index].top - this.pageTop;
      window.scrollTo(0, targetH); //   切换导航样式

      this.navSwitchStyle(index);
    },
    //  滚动条滚动事件
    scrollEvent: function scrollEvent() {
      // 注： 此时this不当前对象
      var scrollH = document.documentElement.scrollTop || document.body.scrollTop; // 返回顶部显示隐藏

      if (scrollH >= 200) {
        pointNav.goTopNode.classList.remove('hide');
      } else {
        pointNav.goTopNode.classList.add('hide');
      } // 响应式导航切换


      var index = 0;

      for (var i = 0; i < pointNav.navLen; i++) {
        // 目标位于最后一个导航之后，距离大于等于最后一个导航的top值
        if (i == pointNav.navLen - 1) {
          index = i;
          break;
        } // 目标介于当前导航与下一导航之间


        if (scrollH < pointNav.page[i + 1].top) {
          index = i;
          break;
        }
      }

      pointNav.navSwitchStyle(index);
    },
    init: function init() {
      this.getNavTarget();
      this.navSwitch();
      this.scrollEvent();
    } // 购物选项

  };
  var goShoping = {
    // 商品参数（款式）
    $shopParamesNode: $('.shop-parame'),
    // 商品参数选择
    paramesChoose: function paramesChoose() {
      this.$shopParamesNode.on('click', '.parame-info li', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      });
    },
    // 添加购物车
    addCar: function addCar() {
      var shopCar = this.getShopparames();

      if (!shopCar) {
        return;
      } // 加入购物车


      m_alert("\u52A0\u5165\u8D2D\u7269\u8F66<br> " + JSON.stringify(shopCar));
    },
    // 直接购买
    goBuy: function goBuy() {
      var shopItem = this.getShopparames();

      if (!shopItem) {
        return;
      } // 直接购买


      m_alert("\u76F4\u63A5\u8D2D\u4E70<br> " + JSON.stringify(shopItem));
    },
    // 获取购物参数
    getShopparames: function getShopparames() {
      var parames = [];
      var $parameItem = this.$shopParamesNode.find('.parame-item');

      for (var i = 0; i < $parameItem.length; i++) {
        var tempKey = $($parameItem[i]).find('.parame-title').html();
        var tempVal = $($parameItem[i]).find('.parame-info li.active').html();
        console.log(11112);

        if (!tempVal) {
          m_alert([tempKey] + '未选择');
          return false;
        }

        parames.push(_defineProperty({}, tempKey, tempVal));
      }

      return parames;
    },
    init: function init() {
      var _this2 = this;

      var addCarNode = document.getElementById('addCar');
      var goBuyNode = document.getElementById('goBuy');
      this.paramesChoose(); // 加购操作

      addCarNode.onclick = function () {
        _this2.addCar();
      }; // 直接购买


      goBuyNode.onclick = function () {
        _this2.goBuy();
      };
    }
  };
  pointNav.init();

  window.onscroll = function () {
    // 绑定滚动事件
    window.addEventListener('scroll', pointNav.scrollEvent);
  };

  goShoping.init(); // 初始化轮播图

  new Swiper('#commodity .swiper-container', {
    loop: true,
    // 循环模式选项
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });
})();