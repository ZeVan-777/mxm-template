/**
 * Created by Administrator on 2017/6/14.
 */
$(function() {
  var mainMethod = {
    //清空输入框组并解除禁用
    clearInput:function () {
      $('.input-group input').val('');
      $('.select-type').val('menu');
      $('.select-use').val('use');
      $('.input-group input,.input-group select').removeAttr('disabled');
      $('.select-icon,.btn-save,.btn-cancle').removeAttr('disabled');
    },
    //点击新增父资源
    addParent:function() {
      mainMethod.clearInput();
    },
    //打开图标容器
    openIConBox:function() {
      $('#iconsExample').show();
    }
  };
  //关闭图标容器时触发的事件
  $('body').on('click', '.iconlist i', function() {
    //获取i标签上的class属性
    var classAttr = $(this).attr('class');
    $('.sys-icon-name').val(classAttr);
    //关闭对话框

    var modalTrigger = $('.select-icon').data('zui.modaltrigger');
    modalTrigger.close();
    $('#iconsExample').hide();
  });
  //点击右上角的X关闭按钮时要隐藏图标容器
  $('body').on('click','button[data-dismiss="modal"]',function() {
    $("#iconsExample").hide();
  })
  $(".add-parent").on('click',mainMethod.addParent);
  $('.select-icon').on('click',mainMethod.openIConBox);
})