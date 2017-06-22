/**
 * Created by Administrator on 2017/6/22.
 */
/**
 * Created by Administrator on 2017/6/14.
 */

//初始化数据表格
$('table.datatable').datatable({
  data: {
    cols: [
      {text: '任务名', type: 'string', flex: false },
      {text: '表达式', type: 'string', flex: false },
      {text: '类/bean名', type: 'string', flex: false},
      {text: '方法名', type: 'string', flex: false},
      {width:'100px',text: '上次执行时间', type: 'number', flex: true},
      {width:'100px',text: '上次执行时长(毫秒)', type: 'number', flex: true },
      {width:'100px',text: '下次执行时间', type: 'number', flex: true},
      {width:'100px',text: '执行数', type: 'number', flex: true},
      {width:'100px',text: '异常数', type: 'number', flex: true},
      {text: '是否有效', type: 'string', flex:false},
      {width:'250px',text: '操作', type: 'string', flex:false},
    ],
    rows: [
      { checked: false, data: ['自动平仓', '<5', 'pingcang','方法222222',10,1,2,4,5,'有效' ,'<button class="btn' +
      ' btn-primary"><i class="icon-search"></i>搜索</button><button class="btn' +
      ' btn-primary"><i class="icon-search"></i>重置</button>'] },
      { checked: false, data: ['自动平仓', '<5', 'pingcang','方法22',10,1,2,4,5,'有效' ,'<button class="btn' +
      ' btn-primary">修改</button><button class="btn' +
      ' btn-success">删除</button><button class="btn' +
      ' btn-danger">立即运行</button>'] },
      { checked: false, data: ['自动平仓', '<5', 'pingcang','方法22',10,1,2,4,5,'有效' ,'<button class="btn' +
      ' btn-primary">修改</button><button class="btn' +
      ' btn-success">删除</button><button class="btn' +
      ' btn-danger">立即运行</button>'] }


      // 更多数据
    ]
  }
});
