"use strict";

(function () {
  var logistics = {
    // 复制单号
    copyOddNum: function copyOddNum() {
      var copyOddNumNode = document.getElementById('copyOddNum');
      var oddNum = document.getElementById('oddNum');

      copyOddNumNode.onclick = function () {
        console.log(oddNum);
        copyText(oddNum);
      };
    },
    init: function init() {
      this.copyOddNum();
    }
  };
  logistics.init();
})();