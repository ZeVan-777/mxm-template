$(function () {
  var createRoleMethod = {
    //初始化机构树
    initInstitutionTree:function () {
      var myTreeData = [{
        title: '越秀集团',
        // open: true,     //是否展开节点
        id:"yxjt",
        children: [
          {
            title: '越秀地产',
            // open: true,
            id:"ycjt-yxdc",
            children:[{
              title:'设计部',
              id:"ycjt-yxdc-sjb"
            },{
              title:'开发部',
              id:"ycjt-yxdc-kfb"
            }]
          },
          {
            title: '越秀餐饮',
            id:"yxjt-yxcy",
            // open: true,
            children: [
              {title: '采购部',id:"yxjt-yxcy-cgb"},
              {title: '财务',id:"yxjt-yxcy-cw"}
            ]
          }
        ]
      }, {
        title: '前海圆周',
        id:"qhyz",
        children: [
          {title: '研发部',id:"qhyz-yfb"},
          {title: '武汉分公司',id:'qhyz-wh'}
        ]
      }, {
        title: '广州地铁'
      }];
      $('#institutionTree').tree({data: myTreeData,initialState:'normal'});
    },
    //阻止冒泡
    stopPropagation: function (e) {
      if (e.stopPropagation)
        e.stopPropagation();
      else
        e.cancelBubble = true;
    },
    //点击取消
    cancleBtn:function () {
      window.location.href = './sys-separation-role.html';
    },
    //打开机构树容器
    openTreeBox:function() {
      $('#treeExamples').show();
    }
  };
  //取消按钮返回到分权角色页
  $('.btn-cancle-create').on('click',createRoleMethod.cancleBtn);

  /*============以下为机构树的操作============*/
  createRoleMethod.initInstitutionTree();
  //打开机构树容器
  $('.select-institution').on('click',createRoleMethod.openTreeBox);

  //点击选择机构树节点
  $('body').on('click','.institution-tree-list li span',function(event) {
    createRoleMethod.stopPropagation(event);
    var title = $(this).text(),
      id = $(this).parent().attr('data-id');
    console.log(title,id,"已选中节点");
    $('.sys-institution').val(title);
    var modalTrigger = $('.select-institution').data('zui.modaltrigger');
    modalTrigger.close();
    $('#treeExamples').hide();
  });
  $('body').on('click','.institution-tree-list li .list-toggle',function () {

    var myTree = $('#institutionTree').data('zui.tree');
    myTree.toggle($(this).parent());
  });

  //点击右上角的X关闭按钮时要隐藏图标容器
  $('body').on('click','button[data-dismiss="modal"]',function() {
    $("#treeExamples").hide();
  });
  /*============机构树的操作-end============*/

  //功能权限页面点击复选框的操作
  $('.actionTree').children('li').children('input').on('click',function () {
    console.log($(this).prop('checked'));
    var lists = $(this).parent().children('ul').find('input');
    if ($(this).prop('checked')) {
      $.each(lists,function (index,item) {
        $(item).attr('checked','true');
      })
    };
    if (!$(this).prop('checked')) {
      $.each(lists,function (index,item) {
        $(item).attr('checked','false');
      })
    }
  })

})