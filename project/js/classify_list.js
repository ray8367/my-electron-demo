"use strict";

(function () {
  var classify_list = {
    login_state: false,
    //登录状态
    data_loadEnd_state: false,
    //所有数据全都加载完毕
    is_control: false,
    //是否启用线上会员控制
    search_key: '',
    // 查询关键字
    search_star: 0,
    // 查询开始的页数
    filterBar: document.getElementById('filterBar'),
    $shopListNode: $('.shop-list'),
    //商品列表
    defaultSortField: '',
    //默认排序字段
    // 返回顶部 
    goTopNode: document.getElementById('goTop'),
    // 排序
    sortShop: function sortShop(sort_field) {
      // 若结果与当前排序一致，取消操作
      if (!sort_field || sort_field === this.defaultSortField) {
        return;
      }

      console.log('按' + sort_field + '排序');
      this.defaultSortField = sort_field;
    },
    // 获取商品数据
    getShopList: function getShopList() {
      var _this2 = this;

      // 数据全部加载完状态
      if (this.data_loadEnd_state) {
        return;
      } // 初始查询位置


      if (this.search_star === 0) {
        this.$shopListNode.html(''); // 第一次查询显示加载动画

        m_loading();
      } // 请求
      // m_api.work({
      //         TYPE: 'by_nick_query_product', //(必填值固定)
      //         member_id: '', //会员编号会员为空可不传
      //         nick_name: this.search_key, //分类名称(必填)
      //         start: this.search_star, //从第几条数据开始查询  不传默认为0
      //     },
      // 模拟请求


      mockShopList(function (res) {
        m_loadEnd();

        if (res.status) {
          console.log(res);
          _this2.is_control = res.is_control;

          if (res.root.length === 0) {
            console.log('没有更多了...');
            _this2.data_loadEnd_state = true;
            $('.no-more').html('--没有更多了--');
          }

          _this2.fillShopList(res.root); // 更新开始页


          _this2.search_star = res.start;
        }
      }, function (err) {
        m_loadEnd();
        console.log(err);
      });
    },

    /**填充商品列表 */
    fillShopList: function fillShopList(shop_list) {
      var _this3 = this;

      shop_list.forEach(function (item) {
        var item_inner = '';
        item_inner += "\n                <li class=\"m-col-2\">\n                <a href=\"./shop_details.html?product_id=" + item['product_id'] + "\">\n                    <img\n                        class= \"lazyload\"\n                        src=\"./common/img/ajax_bg.png\"\n                        data-src=\"" + (m_api.img_base + item['main_img']) + "\"\n                        >\n                ";

        if (_this3.is_control) {
          // 若启用线上会员控制
          // 显示会员标签,会员价,零售价
          item_inner += "\n                    <div class=\"price\">\n                        <span class=\"vip-mark\">\u4F1A\u5458\u4EF7</span>\n                        <span class=\"price-val m-strong\">" + item['member_price'] + "</span>\n                        <span class=\"original-price\">\uFFE5" + item['retail_price'] + "</span>\n                    </div>\n                    ";
        } else {
          // 未启用线上会员控制
          if (_this3.login_state && item['isDis']) {
            // 已登录且该商品已打折(显示折后价,零售价,折扣)
            item_inner += "\n                            <div class=\"price\">\n                                <span class=\"price-val m-strong\">" + item['price'] + "</span>\n                                <span class=\"original-price\">" + item['retail_price'] + "</span>\n                                <span class=\"discount\">" + item['discount'] + "\u6298</span>\n                            </div>\n                            ";
          } else {
            // 未登录或者该商品未打折(显示零售价)
            item_inner += "\n                            <div class=\"price\">\n                                <span class=\"price-val m-strong\">" + item['retail_price'] + "</span>\n                            </div>\n                            ";
          }
        } // 商品、描述以及末尾


        item_inner += "\n                <p class=\"shop-title ell\">" + (item['product_name'] + "  " + item['product_describe']) + "</p>\n                </a>\n            </li>\n                ";

        _this3.$shopListNode.append(item_inner);
      }); // 懒加载

      lazyload();
      $('.lazyload').error(function () {
        $(this).attr('src', './common/img/ajax_bg.png');
      });
    },

    /**
     * 修改排序图标
     * @param {Object} target 修改图标的元素
     * @param {String} type 排序方式('asc'/'desc')
     */
    sortOrderSetIcon: function sortOrderSetIcon(target, type) {
      var baseClass = 'sort-icon iconfont';
      var className = '';

      if (type === 'asc') {
        // 升序图标
        className = baseClass + ' ' + 'iconsort-asc';
      } else if (type === 'desc') {
        className = baseClass + ' ' + 'iconsort-desc';
      } else {
        // 无排序
        className = baseClass + ' ' + 'iconsort-nomal';
      }

      $(target).attr('class', className);
    },
    init: function init() {
      var _this = this; // 获取登录状态


      if (getLoginState()) {
        this.login_state = true;
      } else {
        this.login_state = false;
      } // 获取传递的商品名称


      var _nick_name = getQueryString('nick_name');

      this.search_key = decodeURI(_nick_name);
      $('.search-text').html(this.search_key); // 获取商品列表

      this.getShopList(); // 筛选条默认top

      var filterBarTop = this.filterBar.offsetTop; // 导航高

      var nav_h = document.getElementsByClassName('m-header')[0].clientHeight; // 排序项

      var $sortItemNode = $('.list-filter-bar .sort'); // 综合排序选项

      var comprehensiveItem = document.getElementById('comprehensive'); // 更多排序项

      var $moreFilterNode = $('.more-filter');
      var $moreFilterList = $('.more-filter-list');
      var $moreFilterItem = $('.more-filter-list li'); // 上滚显示搜索，下滚隐藏搜索

      scrollDirection({
        upHand: function upHand() {
          _this.filterBar.style.top = filterBarTop + 'px';
        },
        downHand: function downHand() {
          _this.filterBar.style.top = 0;
        },
        scrollHand: function scrollHand(e) {
          var scrollH = document.body.scrollHeight;
          var clientH = document.body.clientHeight; // 避免回弹

          if (e.scrollTop <= 100) {
            _this.filterBar.style.top = filterBarTop + 'px';
          } // 返回顶部


          if (e.scrollTop >= 200) {
            _this.goTopNode.classList.remove('hide');
          } else {
            _this.goTopNode.classList.add('hide');
          } // console.log(e)


          if (scrollH - e.scrollTop <= clientH) {
            console.log('到底了'); // 加载更多...

            $('.no-more').html('努力加载中...');

            _this.getShopList();
          }
        },
        wait: 200
      }); // 排序

      $sortItemNode.on('click', function () {
        // 获取排序字段
        var sort_field = this.dataset.sort_field; // 有设置升序降序是特殊处理

        if ($(this).hasClass('sort-set')) {
          var sort_order = this.dataset.sort_order;
          var sort_icon = null;

          if (sort_order == 'asc') {
            // 升序切换为降序
            this.dataset.sort_order = 'desc';
            sort_order = 'desc';
          } else if (sort_order === 'dsc') {
            // 降序切换为升序
            this.dataset.sort_order = 'asc';
            sort_order = 'asc';
          } else {
            // 未排序切换为升序
            this.dataset.sort_order = 'asc';
            sort_order = 'asc';
          } // 修改排序图标


          sort_icon = $(this).find('.sort-icon');

          _this.sortOrderSetIcon(sort_icon, sort_order); // 处理后的排序字段


          sort_field = sort_field + '_' + sort_order;
        } // 按查询条件排序


        _this.sortShop(sort_field);

        $sortItemNode.removeClass('active');
        $(this).addClass('active');
      }); // 综合选项

      comprehensiveItem.onclick = function () {
        // 判断是否选中,选中则打开
        var filterBarTop = 0;

        if ($(this).hasClass('active')) {
          // 获取当前top值
          filterBarTop = _this.filterBar.offsetTop;
          $moreFilterNode.css('top', filterBarTop + nav_h);
          $moreFilterNode.toggle();
        }
      }; // 综合选项内的排序条件


      $moreFilterList.on('click', 'li', function () {
        var sort_field = ''; // 设置综合排序的排序字段

        $moreFilterItem.removeClass('active');
        $(this).addClass('active'); // 修改综合选项中的排序字段

        sort_field = this.dataset.sort_field;
        comprehensiveItem.dataset.sort_field = sort_field;
        $(comprehensiveItem).children('.item-text')[0].innerHTML = this.dataset.sort_label; // 重新排序...  

        _this.sortShop(sort_field); // 关闭


        $moreFilterNode.hide();
      }); // 点击空白关闭更多排序条件窗口

      clickBlank(function () {
        $moreFilterNode.hide(); // console.log('')
      }, ['click', 'touchmove'], '.more-filter-list.m-bd-bottom', '#comprehensive');
    }
  };
  classify_list.init();
})();
/**
 * 滚动方向
 * @param {Function} op.upHand  上滚
 * @param {Function} op.downHand    下滚
 * @param {Function} op.scrollHand    滚动
 * @param {Number} op.wait  节流时间隔 默认300ms
 * @param {Number} op.height  误差高度
 * return scrollTop
 */


function scrollDirection(op) {
  if (!op) {
    return;
  }

  var defaultTop = document.body.scrollTop || document.documentElement.scrollTop;
  var height = op.height || 0;

  function scroll() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var diffTop = scrollTop - defaultTop;

    if (diffTop < -height) {
      op.upHand && op.upHand({
        scrollTop: scrollTop
      });
    } else if (diffTop >= height) {
      op.downHand && op.downHand({
        scrollTop: scrollTop
      });
    }

    op.downHand && op.scrollHand({
      scrollTop: scrollTop
    });
    defaultTop = scrollTop;
  }

  if (typeof throttle != 'undefined' && op.wait) {
    // 节流处理
    document.addEventListener('scroll', throttle(scroll, op.wait || 300));
  } else {
    // window.onscroll = scroll;
    document.addEventListener('scroll', scorll);
  }
}