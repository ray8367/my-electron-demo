"use strict";

// 地址选择
var addressChoose = {
  provinceVal: '',
  cityVal: '',
  areaVal: '',
  provincePath: 86,
  cityPath: 110000,
  areaPath: 110100,
  // 省
  $provinceNode: $('#addressContent .province-list .list-data'),
  $provinceSet: $('#addressSwitch .set-province'),
  // 市
  $cityNode: $('#addressContent .city-list .list-data'),
  $citySet: $('#addressSwitch .set-city'),
  // 区
  $areaNode: $('#addressContent .area-list .list-data'),
  $areaSet: $('#addressSwitch .set-area'),
  init: function init() {
    var _this = this; // 选项卡


    var $tab_switch = $('#addressSwitch .set-item'),
        $tab_cont = $('#addressContent .address-list');
    tabActive($tab_switch, $tab_cont, 'active'); // 地址初始化

    this.setDefaultAddress(); // 选择省

    this.$provinceNode.on('click', '.list-item', function () {
      _this.addressClickEvent(this, 'province');
    }); //选择市 

    this.$cityNode.on('click', '.list-item', function () {
      _this.addressClickEvent(this, 'city');
    }); // 选择区

    this.$areaNode.on('click', '.list-item', function () {
      _this.addressClickEvent(this, 'area');
    });
  },

  /**地址点击
   * @parmea 
   *  Node 点击元素
   *  AddressType 当前点击地址类型（province/city/area）
   */
  addressClickEvent: function addressClickEvent(Node, AddressType) {
    // 样式切换
    $(Node).siblings().removeClass('active');
    $(Node).addClass('active'); // 更新当前级所选

    var choosetext = Node.innerHTML;

    if (Node.innerHTML.trim() == '暂无信息') {
      choosetext = '';
    }

    console.log(choosetext);
    this[AddressType + 'Val'] = choosetext;
    this['$' + AddressType + 'Set'].html(choosetext); // 更新下一级

    switch (AddressType) {
      case 'province':
        {
          // 省级-市级
          // 更新市引用
          this.cityPath = Node.getAttribute('data-path'); // 更新市列表

          this.setAddressList(this.cityPath, this.$cityNode); // 跳转至市选项

          this.$citySet.click(); // 清空市值

          this.cityVal = '';
          this.$citySet.html('请选择'); // 隐藏区列表

          this.$areaSet.hide();
          break;
        }

      case 'city':
        {
          // 市级-区级
          this.areaPath = Node.getAttribute('data-path');
          this.setAddressList(this.areaPath, this.$areaNode);
          this.$areaSet.click();
          this.areaVal = '';
          this.$areaSet.html('请选择');
          this.$areaSet.show();
        }

      case 'area':
        {
          break;
        }

      default:
        {
          console.log('参数错误');
          break;
        }
    }
  },

  /**设置地址列表 */
  setAddressList: function setAddressList(path, node) {
    var List = ChineseDistricts[path];
    var inner = '';

    if (!List) {
      console.log('什么也没有'); // return

      inner = "<li class=\"list-item m-p10 m-list list-icon\" data-path=\"-1\">\n                    \u6682\u65E0\u4FE1\u606F\n                </li>";
    } else {
      for (var key in List) {
        if (List.hasOwnProperty(key)) {
          var item = List[key];
          inner += "\n                        <li class=\"list-item m-p10 m-list list-icon\" data-path=\"" + key + "\">\n                            " + item + "\n                        </li>\n                   ";
        }
      }
    }

    node.html(inner);
  },

  /** 设置初始地址 */
  setDefaultAddress: function setDefaultAddress() {
    // 顶部默认值
    this.$provinceSet.html(this.provinceVal);
    this.$citySet.html(this.cityVal);
    this.$areaSet.html(this.areaVal);

    if (this.provinceVal === '') {
      this.$provinceSet.html('请选择');
    } // 加载省列表


    this.setAddressList(this.provincePath, this.$provinceNode); // 获取市引用

    var $provinceItem = this.$provinceNode.find('.list-item');
    this.cityPath = this.getPath($provinceItem, this.provinceVal); // 加载市列表

    this.setAddressList(this.cityPath, this.$cityNode); // 获取区引用

    var $cityItem = this.$cityNode.find('.list-item');
    this.areaPath = this.getPath($cityItem, this.cityVal); // 加载区列表

    this.setAddressList(this.areaPath, this.$areaNode); // 获取区下一级引用

    var $areaItem = this.$areaNode.find('.list-item');
    this.getPath($areaItem, this.areaVal);
  },

  /**获取当前级所选地址以及下一级地址引用 */
  getPath: function getPath(nodeList, val) {
    if (!val) {
      return;
    }

    var path;

    for (var i = 0, len = nodeList.length; i < len; i++) {
      var item_inner = nodeList[i].innerHTML.trim();

      if (item_inner === val) {
        nodeList[i].classList.add('active');
        path = nodeList[i].getAttribute('data-path');
        break;
      }

      if (i == len - 1) {
        console.log('无效地址地址: ' + val);
      }
    }

    return path;
  }
};
var main = {
  // 收货地址列表
  receiveList: [],
  addressListNode: document.getElementById('addressList'),
  // 编辑界面
  $editAddress: $('.edit-address'),
  editInfoNode: {
    title: $('.edit-address .edit-title'),
    human: $('.edit-address .human'),
    phone: $('.edit-address .phone'),
    province: $('.edit-address .province'),
    city: $('.edit-address .city'),
    area: $('.edit-address .area'),
    detailsAddress: $('.edit-address .info-details-address'),
    chooseAddress: $('#chooseAddressEnter')
  },
  init: function init() {
    var _this2 = this;

    var _this = this; // 获取收货列表


    getReceiveAddressList(function (res) {
      _this2.receiveList = res.receiveList; // 填充收货地址

      _this2.fullReceive();
    }, function (err) {
      console.log(err);
    }); // 选择收货地址入口

    var chooseAddressEnter = document.getElementById('chooseAddressEnter');

    chooseAddressEnter.onclick = function () {
      // 地址选择初始化
      addressChoose.provinceVal = _this.editInfoNode.province.html().trim(), addressChoose.cityVal = _this.editInfoNode.city.html().trim(), addressChoose.areaVal = _this.editInfoNode.area.html().trim();
      $('.addreee-choose').show();
      $('.addreee-choose .address-choose-box').addClass('moveUp');
      addressChoose.init();
    }; // 编辑收货地址


    $('.address-list').on('click', '.edit', function () {
      var index = $(this).parents('.address-item').index(); // 打开编辑界面

      _this.openEditPage(index);
    }); // 复制收货人信息

    $('.address-list').on('click', '.copy', function () {
      var index = $(this).parents('.address-item').index();
      var item = _this.receiveList[index];
      var tempDiv = document.createElement('div');
      var tempText = "\u6536\u8D27\u4EBA\uFF1A" + item.human + "\n\u624B\u673A\u53F7\u7801\uFF1A" + item.phone + "\n\u6240\u5728\u5730\u533A\uFF1A" + item.province + item.city + item.area + "\n\u8BE6\u7EC6\u5730\u5740\uFF1A" + item.details;
      tempDiv.innerHTML = tempText;
      copyText(tempDiv);
    }); // 删除收货地址

    $('.address-list').on('click', '.del', function () {
      var index = $(this).parents('.address-item').index();
      m_confirm('确认要删除吗?', function () {
        // 请求后台执行删除
        // 删除数据
        _this.receiveList.splice(index, 1);

        console.log(_this.receiveList); // 重新加载界面

        _this.fullReceive();
      });
    }); // 设置默认地址

    $('.address-list').on('change', '.defalut-address', function () {
      var index = $(this).parents('.address-item').index(); // 提交修改
      // 取消其他默认值

      for (var i = 0; i < _this.receiveList.length; i++) {
        _this.receiveList[i].isDefault = false;
        $(this).parents('.address-item').siblings().find('.label-text').html('设为默认');
      } // 设置当前默认值


      $(this).parents('.m-radio').siblings('.label-text').html('默认');
      _this.receiveList[index].isDefault = true;
    }); // 保存收货地址

    $('#editSave').on('click', function () {
      var human = _this2.editInfoNode.human.val().trim(),
          phone = _this2.editInfoNode.phone.val().trim(),
          province = _this2.editInfoNode.province.html().trim(),
          city = _this2.editInfoNode.city.html().trim(),
          area = _this2.editInfoNode.area.html().trim(),
          detailsAddress = _this2.editInfoNode.detailsAddress.val().trim(); // 检查完整度


      if (human == '') {
        m_alert('请填写收货人姓名');
      } else if (phone == '') {
        m_alert('请填写联系方式');
      } else if (province == '' || city == '') {
        m_alert('请选择省市信息');
      } else if (detailsAddress == '') {
        m_alert('请填写详细地址');
      } else {
        // 保存至界面
        var index = _this2.$editAddress.attr('data-index');

        var receiveInfo = {
          human: human,
          phone: phone,
          province: province,
          city: city,
          area: area,
          detailsAddress: detailsAddress
        };
        console.log(index);

        if (Number(index) === -1) {
          // 新建一个
          // 后台请求
          // 添加至数据
          _this2.receiveList.push(receiveInfo); // 添加至页面


          _this2.addReceive(receiveInfo);
        } else {
          _this2.updateReceiveAddress(index, receiveInfo);
        } // 清除索引


        _this2.$editAddress.attr('data-index', -1); // 退出    


        _this2.closeEditAddress();
      }
    }); // 取消编辑收货信息

    $('#editClose').on('click', function () {
      _this2.closeEditAddress();
    }); // 取消选择地址

    $('.addreee-choose .address-choose-box .close').on('click', function () {
      _this2.closeAddressChoose();
    }); // 保存选择地址

    $('.addreee-choose .address-choose-box .save').on('click', function () {
      // 界面更新
      _this2.editInfoNode.province.html(addressChoose.provinceVal.trim());

      _this2.editInfoNode.city.html(addressChoose.cityVal.trim());

      _this2.editInfoNode.area.html(addressChoose.areaVal.trim()); // 关闭窗口


      _this2.closeAddressChoose();
    }); // 新增收货地址

    $('#addReceiveBtn').on('click', function () {
      _this2.openEditPage();
    });
  },

  /**关闭编辑窗 */
  closeEditAddress: function closeEditAddress() {
    var _this3 = this;

    // 清空内容
    this.editInfoNode.human.val(''), this.editInfoNode.phone.val(''), this.editInfoNode.province.html(''), this.editInfoNode.city.html(''), this.editInfoNode.area.html(''), this.editInfoNode.detailsAddress.val(''); // 退出

    this.$editAddress.css('opacity', 0);
    this.$editAddress.on('transitionend', function () {
      _this3.$editAddress.hide();
    });
  },

  /**关闭地址选择 */
  closeAddressChoose: function closeAddressChoose() {
    var $addressChoose = $('.addreee-choose .address-choose-box');
    $addressChoose.removeClass('moveUp');
    $addressChoose.on('transitionend', function () {
      $('.addreee-choose').hide();
    });
  },

  /**更新收货地址 */
  updateReceiveAddress: function updateReceiveAddress(index, newAddressInfo) {
    // 更新至后台
    // 修改数据
    console.log(newAddressInfo);

    for (var key in newAddressInfo) {
      if (newAddressInfo.hasOwnProperty(key)) {
        var element = newAddressInfo[key];
        this.receiveList[index][key] = element;
      }
    }

    console.log(this.receiveList[index]); // 更新界面显示

    var $addresstarget = $('#addressList .address-item').eq(index);
    $addresstarget.find('.human').html(newAddressInfo['human']);
    $addresstarget.find('.phone').html(newAddressInfo['phone']);
    $addresstarget.find('.province').html(newAddressInfo['province']);
    $addresstarget.find('.city').html(newAddressInfo['city']);
    $addresstarget.find('.area').html(newAddressInfo['area']);
    $addresstarget.find('.xs-address').html(newAddressInfo['editInfo']);
  },

  /** 编辑收货地址(添加或者编辑) */
  openEditPage: function openEditPage(index) {
    if (typeof index == 'undefined') {
      // 添加
      this.editInfoNode.title.html('添加新地址');
      this.editInfoNode.human.val('');
      this.editInfoNode.phone.val('');
      this.editInfoNode.province.html('请选择地区');
      this.editInfoNode.detailsAddress.val('');
      this.$editAddress.attr('data-index', -1);
    } else {
      var item = this.receiveList[index]; // 编辑

      this.editInfoNode.title.html('.edit-title').html('编辑地址');
      this.editInfoNode.human.val('.human').val(item.human);
      this.editInfoNode.phone.val('.phone').val(item.phone);
      this.editInfoNode.province.html(item.province);
      this.editInfoNode.city.html(item.city);
      this.editInfoNode.area.html(item.area);
      this.editInfoNode.detailsAddress.val('.info-details-address').val(item.details); // 将进入编辑界面时的索引保存在编辑界面上

      this.$editAddress.attr('data-index', index);
    }

    this.$editAddress.show();
    this.$editAddress.css('opacity', 1);
  },

  /**新建地址 */
  addReceive: function addReceive(addReceiveInfo) {
    var item = addReceiveInfo; // 更新至界面

    var inner = "\n            <div class=\"address-item m-card m-p10\">\n            <p class=\"info\">\n                <span class=\"human\">" + item.human + "</span>\n                <span class=\"phone\">" + item.phone + "</span>\n            </p>\n            <p class=\"info ell\">\n                <span class=\"province\">" + item.province + "</span>\n                <!-- \u5E02 -->\n                <span class=\"city\">" + item.city + "</span>\n                <!-- \u533A/\u53BF -->\n                <span class=\"area\">" + item.area + "</span>\n                <!--\u8BE6\u7EC6\u5730\u5740 -->\n                <span class=\"xs-address\">" + item.details + "</span>\n            </p>\n            <div class=\"set m-list\">\n                <div class=\"m-l-left\">\n                    <label>\n                        <div class=\"m-radio\">\n                            <input type=\"radio\" class=\"defalut-address\" name=\"defalut-address\" " + (item.isDefault ? 'checked' : '') + " >\n                            <span class=\"check\"></span>\n                        </div>\n                        <span class=\"label-text\">" + (item.isDefault ? '默认' : '设为默认') + "</span> \n                    </label>\n                </div>\n                <div class=\"m-right\">\n                    <span class=\"set-work del \">\u5220\u9664</span>\n                    <span class=\"set-work copy\">\u590D\u5236</span>\n                    <span class=\"set-work edit\">\u7F16\u8F91</span>\n                </div>\n            </div>\n        </div>\n            ";
    $(this.addressListNode).append(inner);
  },

  /**填充列表 */
  fullReceive: function fullReceive() {
    this.addressListNode.innerHTML = '';

    for (var i = 0; i < this.receiveList.length; i++) {
      this.addReceive(this.receiveList[i]);
    }
  }
};
main.init();