"use strict";

(function () {
  var search = {
    searchForm: document.querySelector('.search-form'),
    $searchIpt: $('.search-ipt'),
    $searchLogNode: $('.search-log'),
    //搜索历史记录
    searchLogList: $('.search-log-list')[0],
    //搜索历史列表
    $searchResultNode: $('.search-result'),
    //搜索结果 
    // 填充本地搜索记录
    fillSearchLog: function fillSearchLog() {
      var search_log = this.getSearchLog();
      console.log();
      var log_inner = '';

      if (search_log.length >= 1) {
        this.$searchLogNode.show();
      }

      search_log.forEach(function (item) {
        log_inner += "<li>" + item + "</li>";
      });
      this.searchLogList.innerHTML = log_inner;
    },
    // 读取本地搜索记录
    getSearchLog: function getSearchLog() {
      var search_log = localStorage.getItem('search_log') || "[]";

      try {
        search_log = JSON.parse(search_log);
      } catch (error) {
        search_log = [];
      }

      return search_log;
    },
    // 添加搜索记录
    addSearchLog: function addSearchLog(msg) {
      var search_log = this.getSearchLog();

      if (search_log.indexOf(msg) === -1) {
        search_log.push(msg);
        this.searchLogList.innerHTML += "<li>" + msg + "</li>";
        localStorage.setItem('search_log', JSON.stringify(search_log));
        this.$searchLogNode.show();
      }
    },
    // 清空搜索记录(页面清除以及本地删除)
    clearSearchLog: function clearSearchLog() {
      console.log('清空..');
      localStorage.setItem('search_log', ""); // 界面清空

      this.searchLogList.innerHTML = '';
      this.$searchLogNode.hide();
    },
    init: function init() {
      var _this2 = this;

      var _this = this;

      var $clearLog = $('.clear-log'); // 填充历史记录

      this.fillSearchLog(); // 提交搜索

      this.searchForm.onsubmit = function (e) {
        stopDefault(e);

        var search_text = _this2.$searchIpt.val().trim();

        console.log(search_text);

        if (search_text === '') {
          return;
        } // 隐藏记录，显示结果


        _this2.$searchLogNode.hide();

        _this2.$searchResultNode.show(); // 搜索有结果的添加至历史记录


        _this2.addSearchLog(search_text);
      }; // 输入框变化


      this.$searchIpt.on('input', debounce(function () {
        var search_text = _this2.$searchIpt.val().trim();

        if (search_text === '') {
          // 隐藏搜索结果,显示搜索记录
          _this2.$searchResultNode.hide();

          console.log(_this2.getSearchLog());

          if (_this2.getSearchLog().length >= 1) {
            _this2.$searchLogNode.show();
          }
        }
      }, 300)); // 历史记录点击(触发搜索)

      $(this.searchLogList).on('click', 'li', function () {
        _this.$searchIpt.val(this.innerHTML);

        _this.searchForm.onsubmit();
      }); // 历史记录清空

      $clearLog.on('click', function () {
        _this2.clearSearchLog();
      });
    }
  };
  search.init();
})();