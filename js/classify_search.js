"use strict";

/**
 * 商品分类查询
 */
var class_search = {
  login_state: false,
  //登录状态
  data_loadEnd_state: false,
  //所有数据全都加载完毕
  is_control: false,
  //是否启用线上会员控制
  search_star: 0,
  // 查询开始的页数
  // 查询商品信息
  getShopList: function getShopList(search_key, success, error) {
    var _this = this;

    console.log('查询'); // 数据全部加载完状态
    // if (this.data_loadEnd_state) {
    //     return;
    // }
    // 请求

    m_api.work({
      TYPE: 'by_nick_query_product',
      //(必填值固定)
      member_id: '',
      //会员编号会员为空可不传
      nick_name: search_key,
      //分类名称(必填)
      start: this.search_star //从第几条数据开始查询  不传默认为0

    }, function (res) {
      console.log(res);

      if (res.status) {
        _this.is_control = res.is_control;
        _this.search_star = res.start;

        if (res.root.length === 0) {
          _this.data_loadEnd_state = true;
        }
      }

      success(res);
    }, function (err) {
      error(err);
    });
  },
  // 填充商品信息
  fillShopList: function fillShopList(shop_list) {
    var _this2 = this;

    shop_list.forEach(function (item) {
      var item_inner = '';
      item_inner += "\n                <li class=\"m-col-2\">\n                <a href=\"./shop_details.html?product_id=" + item['product_id'] + "\">\n                    <img\n                        class= \"lazyload\"\n                        src=\"./common/img/ajax_bg.png\"\n                        data-src=\"" + (m_api.img_base + item['main_img']) + "\"\n                        >\n                ";

      if (_this2.is_control) {
        // 若启用线上会员控制
        // 显示会员标签,会员价,零售价
        item_inner += "\n                    <div class=\"price\">\n                        <span class=\"vip-mark\">\u4F1A\u5458\u4EF7</span>\n                        <span class=\"price-val m-strong\">" + item['member_price'] + "</span>\n                        <span class=\"original-price\">\uFFE5" + item['retail_price'] + "</span>\n                    </div>\n                    ";
      } else {
        // 未启用线上会员控制
        if (_this2.login_state && item['isDis']) {
          // 已登录且该商品已打折(显示折后价,零售价,折扣)
          item_inner += "\n                            <div class=\"price\">\n                                <span class=\"price-val m-strong\">" + item['price'] + "</span>\n                                <span class=\"original-price\">" + item['retail_price'] + "</span>\n                                <span class=\"discount\">" + item['discount'] + "\u6298</span>\n                            </div>\n                            ";
        } else {
          // 未登录或者该商品未打折(显示零售价)
          item_inner += "\n                            <div class=\"price\">\n                                <span class=\"price-val m-strong\">" + item['retail_price'] + "</span>\n                            </div>\n                            ";
        }
      } // 商品、描述以及末尾


      item_inner += "\n                <p class=\"shop-title ell\">" + (item['product_name'] + "  " + item['product_describe']) + "</p>\n                </a>\n            </li>\n                ";

      _this2.$shopListNode.append(item_inner);
    }); // 懒加载

    lazyload();
  },
  init: function init() {
    // 获取登录状态
    // 获取登录状态
    if (getLoginState()) {
      this.login_state = true;
    } else {
      this.login_state = false;
    }
  }
};
class_search.init();