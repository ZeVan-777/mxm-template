$(function() {
  var mainMethod = {
    initTable:function() {
      //初始化数据表格
      $('table.datatable').datatable({
        checkable:true,
        sortable:true,
        checkByClickRow:false,
        fixedHeaderOffset:20,
        sort: function(event) {
          console.log(event);

        }
      });
    },
    //新建角色
    createRole:function () {
      window.location.href="./sys-separation-role-create.html";
    }
  };
  mainMethod.initTable();
  $('.create-role').on('click',mainMethod.createRole);
})