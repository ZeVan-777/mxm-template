$(function() {
  var mainMethod = {
    initTable:function() {
      $('table.datatable').datatable({
        checkable:true,
        sortable:true,
        checkByClickRow:false,
        fixedHeaderOffset:20,
        sort: function(event) {
          console.log(event);

        }
      });
    }
  };
  mainMethod.initTable();
})