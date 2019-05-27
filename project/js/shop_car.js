"use strict";

(function () {
  var shopCar = {
    // 管理
    manageBtn: document.getElementById('manageCar'),
    // 管理状态
    manageState: 0,
    // 多选组
    carSelectGroup: null,
    // 结算
    // 删除
    // 购物车列表
    carList: [],
    // 计算总金额
    getTotalMoney: function getTotalMoney() {
      var totalMoney = 0;
      var $carItemNode = $('.car-list .car-item');
      $carItemNode.each(function (i, el) {
        var tempcheck = $(el).find('.m-checkbox input');

        if (tempcheck.attr('checked')) {
          // 单价
          var unit_price = $(el).find('.unit-price').html(); // 数量

          var num = $(el).find('.num').html(); // 总价

          var price = Number(unit_price) * num;
          totalMoney += price;
        }
      });
      return totalMoney;
    },
    // 更新总金额显示
    updateTotalMoney: function updateTotalMoney() {
      // 总金额
      var totalMoneyNode = document.getElementById('totalMoney');
      totalMoneyNode.innerHTML = shopCar.getTotalMoney();
    },
    // 修改购买数量
    setShopAmount: function setShopAmount() {
      var _this = this;

      $('.quantity-set .reduce').on('click', function () {
        var num = getNum(this);

        if (num == 1) {
          return;
        }

        num--;
        setNum(this, num);
      });
      $('.quantity-set .add').on('click', function () {
        var num = getNum(this); // 假定最大限买10

        if (num == 10) {
          return;
        }

        num++;
        setNum(this, num);
      });

      function getNum(el) {
        var oldNum = $(el).siblings('.num').html();
        return Number(oldNum);
      }

      function setNum(el, val) {
        $(el).siblings('.num').html(val); // 更新总价

        _this.updateTotalMoney();
      }
    },
    // 更新多选组
    updatecheckGroup: function updatecheckGroup() {
      this.carSelectGroup = new SelectGroup('.car-select-ipt', 'selectAllCar', {
        checkHand: shopCar.updateTotalMoney,
        checkAllHand: shopCar.updateTotalMoney
      });
    },
    // 切换管理状态
    manageCar: function manageCar() {
      var settlement = document.getElementsByClassName('settlement-bottom')[0];

      if (this.manageState == 0) {
        // 切换为管理状态
        this.manageBtn.innerHTML = '完成';
        this.manageState = 1;
      } else {
        // 切换为提交状态
        this.manageBtn.innerHTML = '管理';
        this.manageState = 0;
      }

      $(settlement).toggleClass('edit');
    },
    // 删除购物车
    removeCar: function removeCar() {
      var _this = this;

      var removeBtn = document.getElementById('removeCar');

      removeBtn.onclick = function () {
        var $carItemNode = $('.car-list .car-item');
        var delShop = [];

        for (var i = 0; i < $carItemNode.length; i++) {
          if ($($carItemNode[i]).find('.m-checkbox input').prop('checked')) {
            delShop.push($carItemNode[i]);
          }
        }

        var delAmount = delShop.length;
        m_confirm('确认删除这' + delAmount + '件商品吗', function () {
          for (var i = 0; i < delShop.length; i++) {
            delShop[i].parentNode.removeChild(delShop[i]);
          } // 重新算账


          _this.updateTotalMoney(); // 跟新多选组


          _this.updatecheckGroup();
        });
      };
    },
    // 初始化
    init: function init() {
      var _this2 = this;

      // 更新总金额
      this.updateTotalMoney(); // 切换管理状态

      this.manageBtn.onclick = function () {
        _this2.manageCar();
      }; // 修改购买数量


      this.setShopAmount(); // 选择购物车商品

      this.updatecheckGroup(); // 删除购物车商品

      this.removeCar();
    }
  };
  shopCar.init();
})();