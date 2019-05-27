"use strict";
/**测试数据 */
// mock api

function mockApi(url, _success, _error) {
  $.ajax({
    url: url,
    type: "POST",
    success: function success(res) {
      _success(res);
    },
    error: function error(err) {
      _error(err);
    }
  });
}
/**商品分类列表1 */


function mockclassifyList1(success, error) {
  var url = 'https://www.easy-mock.com/mock/5cb7cf211dfb2128ae6417d3/mdsc/chain_leaf_json';
  mockApi(url + '?r=' + Math.random(), function (res) {
    success(res);
  }, function (err) {
    console.log('连接错误');
    error(err);
  });
}
/**商品列表 */


function mockShopList(success, error) {
  var url = 'https://www.easy-mock.com/mock/5cb7cf211dfb2128ae6417d3/mdsc/shop_list';
  mockApi(url, function (res) {
    success(res);
  }, function (err) {
    console.log('连接错误');
    error(err);
  });
}
/**收货地址列表 */


function getReceiveAddressList(success, error) {
  var url = 'https://www.easy-mock.com/mock/5cb7cf211dfb2128ae6417d3/mdsc/receive_path';
  mockApi(url, function (res) {
    success(res);
  }, function (err) {
    console.log('连接错误');
    error(err);
  });
}