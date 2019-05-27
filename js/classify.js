"use strict";

(function () {
  // 分类商品
  var classifyShop = {
    // 导航区域
    navListNode: document.getElementById('navList'),
    // 内容区域
    $shop_page: $('#classify-cont .classify-page'),
    // 数据展示区域
    $data_page: $('#classify-cont .classify-page .data-page'),
    // 列表
    classifyArr: [],
    // 获取列表
    getClassifyArr: function getClassifyArr() {
      var _this2 = this;

      m_loading({
        msg: '加载中...'
      });
      m_api.work({
        TYPE: 'chain_leaf_json'
      }, function (res) {
        m_loadEnd();
        console.log(res);

        if (res.status) {
          // 修改列表
          _this2.classifyArr = res.root; // 填充导航

          _this2.fillNav(res.root);

          if (res.root.length > 0) {
            // 选中导航第一项
            $('#navList li')[0].click();
          }
        }
      }, function (err) {
        m_loadEnd();
        console.log(err);
      });
    },
    // 填充导航
    fillNav: function fillNav(nav_list) {
      // 加载导航
      var navInner = '';
      nav_list.forEach(function (item, i) {
        navInner += "<li data-nav_index=\"" + i + "\">" + item['nick_name'] + "</li>";
      });
      this.navListNode.innerHTML = navInner;
    },
    // 填充指定分类
    fillPage: function fillPage(index) {
      var list_data = this.classifyArr[index]['children'];
      var shop_family = $('.shop-family')[0];
      var shop_family_inner = ''; // let layz_img = null;

      list_data.forEach(function (item) {
        shop_family_inner += "\n                    <li class=\"m-col-3\">\n                        <a href=\"./classify_list.html?nick_name=" + encodeURI(encodeURI(item['nick_name'])) + "\">\n                            <img class=\"shop-img lazyload\" src=\"./common/img/ajax_bg.png\" data-src=\"" + (item['img_src'] || "./common/img/ajax_bg.png") + "\">\n                            <p class=\"shop-label\">" + item['nick_name'] + "</p>\n                        </a>\n                </li>\n                ";
      });
      shop_family.innerHTML = shop_family_inner; // 图片懒加载
      //   var layz_img = document.getElementsByClassName('shop-img');

      lazyload(); // 返回页面顶部

      this.$shop_page.scrollTop(0);
    },
    // 切换导航
    catNav: function catNav() {
      var _this = this;

      console.log(this.navListNode);
      $(this.navListNode).on('click', 'li', function () {
        if ($(this).hasClass('active')) {
          return;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active'); // 获取导航信息
        // 填充当页列表

        var index = this.dataset.nav_index;

        _this.fillPage(index);
      });
    },
    init: function init() {
      this.getClassifyArr();
      this.catNav();
    }
  };
  classifyShop.init();
})();