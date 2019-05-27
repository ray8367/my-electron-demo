"use strict";

(function () {
  var comment = {
    shopInfo: {},
    // 描述
    $msNode: $('.point-ms'),
    // 服务
    $fwNode: $('.point-fw'),
    // 物流
    $wlNode: $('.point-wl'),
    // 评论
    $commentNode: $('#commentText'),
    setScore: function setScore() {
      starClick(this.$msNode);
      starClick(this.$fwNode);
      starClick(this.$wlNode);
      /**
       *点击星星
       * @param {星星所在位置父元素} Node
       */

      function starClick($Node) {
        $Node.on('click', '.star-item', function () {
          var index = $(this).index();
          var $gradeNode = $Node.find('.grade');
          var grade = ''; // 点亮合适的星星

          lightUpStar(this, index); // 修改评级

          switch (index) {
            case 0:
              {
                grade = '差';
                break;
              }

            case 1:
              {
                grade = '较差';
                break;
              }

            case 2:
              {
                grade = '一般';
                break;
              }

            case 3:
              {
                grade = '好';
                break;
              }

            case 4:
              {
                grade = '很好';
                break;
              }
          }

          $gradeNode.html(grade);
        });
      }
      /**
       *点亮星星
       * @param {*} Node
       * @param {点亮的索引} index
       */


      function lightUpStar(Node, index) {
        // 熄灭所有
        $(Node).siblings().removeClass('iconstar-light').addClass('iconstar').removeClass('light'); // 点亮至索引处

        var item = Node.parentNode.children;

        for (var i = 0; i < index + 1; i++) {
          $(item[i]).removeClass('iconstar').addClass('iconstar-light').addClass('light');
        }
      }
    },
    uploadImg: function uploadImg() {
      var uploadImgBox = document.getElementById('uploadImgBox');
      var uploadImgipt = document.getElementById('uploadImgipt'); // 图片预览区域

      var previewImgsBox = document.getElementById('previewImgsBox');
      console.log(uploadImgipt); // 添加图片

      uploadImgipt.onchange = function (event) {
        console.log(11);
        var Mb = 1024 * 1024;
        var maxSize = Mb * 10; // 10MB   
        // 获取当前选中的文件

        var file = event.target.files[0]; // 检查文件类型

        if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
          m_alert('文件类型仅支持 jpeg/png/gif');
          return;
        } // 图片尺寸限制 


        if (file.size > maxSize) {
          m_alert('图片大小不能超过' + maxSize / Mb + 'MB');
          return;
        } // 判断是否是ios


        if (iOSVersion) {
          console.log('ios');
        } // 添加图片预览


        addImgPreview(file, 5);
      }; // 移除预览


      $(previewImgsBox).on('click', '.del', function () {
        // 删除图片
        // console.log($(this).parent('.preview-img'))
        $(this).parent('.preview-img').remove(); // 更新计数

        previewCount();
      }); // 图片预览

      function addImgPreview(file) {
        // 创建url
        var imgUrl = window.URL.createObjectURL(file); // 新建容器放置预览图片

        var previewBox = document.createElement('div');
        previewBox.classList.add('upload-img', 'preview-img');
        previewBox.innerHTML = "\n                <img src=\"" + imgUrl + "\" alt=\"\">\n                <i class=\"del iconfont iconguanbi\"></i>\n                "; // previewBox.setAttribute('src',imgUrl);
        // 插入到上传图片容器之前

        $(previewImgsBox).append(previewBox);
        previewCount();
      }
      /**预览计数 */


      function previewCount() {
        var maxlen = 3;
        var count = 0; // 判断图片预览区域是否到达最大值

        count = $('#previewImgsBox .preview-img').length;
        $('#uploadImgBox .text-tip').html(count + '/' + maxlen);

        if (count >= maxlen) {
          uploadImgBox.style.display = 'none';
        } else {
          uploadImgBox.style.display = 'block';

          if (count == 0) {
            $('#uploadImgBox .text-tip').html('添加图片');
          }
        }
      }
    },
    // 提交评价
    submitCommend: function submitCommend() {
      // 描述相符
      var point_ms = this.$msNode.find('.grade').html().trim(); // 物流服务

      var point_wl = this.$wlNode.find('.grade').html().trim(); // 服务态度

      var point_fw = this.$fwNode.find('.grade').html().trim(); // 评论

      var comment_text = this.$commentNode.val().trim(); // 图片
      // 检查是否评分

      if (point_ms === '') {
        m_alert('请对描述是否相符进行评价');
        return;
      } else if (point_wl === '') {
        m_alert('请对物流服务进行评价');
        return;
      } else if (point_fw === '') {
        m_alert('请对服务态度进行评价');
        return;
      } else {
        m_alert("\u63D0\u4EA4\u5185\u5BB9<br>\n                        \u63CF\u8FF0\u76F8\u7B26: " + point_ms + "<br>         \n                        \u7269\u6D41\u670D\u52A1: " + point_wl + "<br>         \n                        \u670D\u52A1\u6001\u5EA6: " + point_fw + "<br>         \n                        \u8BC4\u8BED: " + comment_text + "\n                ");
      }
    },
    init: function init() {
      var _this = this; // 评分


      this.setScore(); // 提交评价

      var submitNode = document.getElementById('submitCommend');

      submitNode.onclick = function () {
        _this.submitCommend();
      }; // 上传图片


      this.uploadImg();
    }
  };
  comment.init();
})();