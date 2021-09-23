<template>
  <div class="app-container">
    <div ref="gantt" class="left-container"/>
  </div>
</template>
<script>
  import gantt from 'dhtmlx-gantt'  // 引入模块
  //import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
  import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css' //皮肤
  import 'dhtmlx-gantt/codebase/locale/locale_cn'  // 本地化
  import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js' //任务条悬浮提示

  export default {
    name: 'gantt',
    data() {
      return {
        tasks: {
          data: []
        }
      }
    },
    methods: {
      //开始时间-结束时间参数
      DateDifference: function(strDateStart, strDateEnd) {
        var begintime_ms = Date.parse(new Date(strDateStart.replace(/-/g, '/'))) //begintime 为开始时间
        var endtime_ms = Date.parse(new Date(strDateEnd.replace(/-/g, '/')))   // endtime 为结束时间
        var date3 = endtime_ms - begintime_ms //时间差的毫秒数
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        return days
      },
      initData: function() {
        this.tasks.data = [
          {
            id: 1,
            text: '计划时间',
            start_date: '2020-04-08',
            duration: 10,
            open: true, //默认打开，
            toolTipsTxt: 'xxxxxxxxxxxxxxxxx'
          },
          {
            toolTipsTxt: 'xxxxxxxxxxxxxxxxx父任务01-001',
            text: '冒烟阶段', // 任务名
            start_date: '2020-04-08', // 开始时间
            id: 11, // 任务id
            duration: 3, // 任务时长，从start_date开始计算
            parent: 1, // 父任务ID
            type: 1
          },
          {
            toolTipsTxt: '',
            text: '单元测试', // 任务名
            start_date: '2020-04-11', // 开始时间
            id: 12, // 任务id
            duration: 2, // 任务时长，从start_date开始计算
            parent: 1, // 父任务ID
            type: 2

          },
          {
            toolTipsTxt: '',
            text: '回归测试', // 任务名
            start_date: '2020-04-13', // 开始时间
            id: 13, // 任务id
            duration: 4, // 任务时长，从start_date开始计算
            parent: 1, // 父任务ID
            type: 3

          }, {
            toolTipsTxt: '',
            text: '阶段四', // 任务名
            start_date: '2020-04-13', // 开始时间
            id: 14, // 任务id
            duration: 4, // 任务时长，从start_date开始计算
            parent: 1, // 父任务ID
            type: 4

          },
          //========================
          {
            id: 2,
            text: '实际时间',
            start_date: '2020-04-08',
            duration: 8,
            open: true, //默认打开，才可隐藏左侧表格
            toolTipsTxt: 'xxxxxxxxxxxxxxxxx',
            state: 'default'
            // color:"#409EFF",
            //progress: 0.6
          },
          {
            toolTipsTxt: 'xxxxxxxxxxxxxxxxx父任务01-001',
            text: '冒烟阶段', // 任务名
            start_date: '2020-04-08', // 开始时间
            id: 21, // 任务id
            duration: 2, // 任务时长，从start_date开始计算
            parent: 2, // 父任务ID
            type: 1
          },
          {
            toolTipsTxt: '',
            text: '单元测试', // 任务名
            start_date: '2020-04-09', // 开始时间
            id: 22, // 任务id
            duration: 2, // 任务时长，从start_date开始计算
            parent: 2, // 父任务ID
            type: 2
          },
          {
            toolTipsTxt: '',
            text: '回归测试', // 任务名
            start_date: '2020-04-11', // 开始时间
            id: 23, // 任务id
            duration: 2, // 任务时长，从start_date开始计算
            parent: 2, // 父任务ID
            type: 3
          }

        ].map(function(current, ind, arry) {
          var newObj = {}
          if (current.type) { //存在type字段 说明非一级菜单，判断阶段的具体类型 设置不同颜色
            if (current.type == 1) { //冒烟
              newObj = Object.assign({}, current, { 'color': '#fcca02' })
            } else if (current.type == 2) { //单元
              newObj = Object.assign({}, current, { 'color': '#fec0dc' })
            } else if (current.type == 3) { //回归
              newObj = Object.assign({}, current, { 'color': '#62ddd4' })
            } else if (current.type == 4){
              newObj = Object.assign({}, current, { 'color': '#d1a6ff' })
            }
          } else { //一级菜单是蓝色的
            newObj = Object.assign({}, current, { 'color': '#5692f0' })
          }

          return newObj
        })
      }
    },
    mounted() {
      this.initData()
      /*
      * 冒烟：fcca02    单元：fec0dc     回归：62ddd4   阶段：d1a6ff
      * */
      //设置图表区域的日期坐标最大值 var date = new Date(dateString.replace(/-/,"/"))
      //  gantt.config.start_date = new Date("2020-04-08".replace(/-/,"/")) ;
      //gantt.config.end_date = new Date("2020-04-18".replace(/-/,"/")) ; //结束时间需要+1天

      //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
      gantt.config.autosize = true
      //只读模式
      gantt.config.readonly = true
      //是否显示左侧树表格
      gantt.config.show_grid = false
      //表格列设置
      gantt.config.columns = [
        { name: 'text', label: '阶段名字', tree: true, width: '120' },
        {
          name: 'duration', label: '时长', align: 'center', template: function(obj) {
            return obj.duration + '天'
          }
        }
        /*{name:"start_date", label:"开始时间", align: "center" },

        {name:"end_date",   label:"结束时间",   align: "center" },*/
      ]
      //时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状。
      gantt.config.show_task_cells = true

      //设置x轴日期
      gantt.config.scale_unit = 'day'
      gantt.config.step = 1
      gantt.config.date_scale = '星期' + '%D'

      //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
      gantt.config.fit_tasks = true
      // 在时间线上增加一行显示星期
      gantt.config.subscales = [
        //{unit:"day",  step:1, date:"星期"+"%D" },
        { unit: 'day', step: 1, date: '%M' + '%d' + '日' }
      ]
      //时间轴图表中，任务条形图的高度
      gantt.config.task_height = 28
      //时间轴图表中，甘特图的高度
      gantt.config.row_height = 36
      //从后端过来的数据格式化
      gantt.config.xml_date = '%Y-%m-%d'
      //任务条显示内容
      gantt.templates.task_text = function(start, end, task) {
        return task.text + '(' + task.duration + '天)'
      }
      // gantt.templates.task_class = function(start, end, task){return "xx";};
      //悬浮
      gantt.templates.tooltip_text = function(start, end, task) {
        //return "<b>任务名称:</b> "+task.text+"<br/><b>时长:</b> " + task.duration+"<br/><b>说明:</b>" +task.toolTipsTxt;
        return '<span style=\'font-size: 14px\'>' + task.toolTipsTxt + '</span>'
      }

      gantt.templates.scale_cell_class = function(date) {
        /*if(date.getDay()== 0 || date.getDay()== 6){
          return "weekend";
        }*/
        return 'weekend'
      }
      //任务栏周末亮色
      /*gantt.templates.task_cell_class = function(item,date){
        if(date.getDay()== 0 || date.getDay()== 6){
          return "weekend";
        }
      };*/
      //任务条上的文字大小 以及取消border自带样式
      gantt.templates.task_class = function(start, end, item) {
        return item.$level == 0 ? 'firstLevelTask' : 'secondLevelTask'
      }
      // 初始化
      gantt.init(this.$refs.gantt)
      // 数据解析
      gantt.parse(this.tasks)
    }
  }
</script>
<style lang="scss">
  .firstLevelTask {
    border: none;
    .gantt_task_content{
      // font-weight: bold;
      font-size: 13px;
    }
  }

  .secondLevelTask {
    border: none;
  }

  .thirdLevelTask {
    border: 2px solid #da645d;
    color: #da645d;
    background: #da645d;
  }

  .milestone-default {
    border: none;
    background: rgba(0, 0, 0, 0.45);
  }

  .milestone-unfinished {
    border: none;
    background: #5692f0;
  }

  .milestone-finished {
    border: none;
    background: #84bd54;
  }

  .milestone-canceled {
    border: none;
    background: #da645d;
  }

  html, body {
    margin: 0px;
    padding: 0px;
    height: 100%;
    overflow: hidden;
  }

  .container {
    height: 900px;
    .left-container {
      height: 100%;
    }
  }

  .left-container {
    height: 600px;
  }

  .gantt_scale_line {
    border-top: 0;
  }

  .weekend {
    //background:#f4f7f4!important;
    color: #000000 !important;
  }

  .gantt_selected .weekend {
    background: #f7eb91 !important;;
  }

  .gantt_task_content {
    text-align: left;
    padding-left: 10px;
  }

  //上面任务条样式
  .gantt_task_scale {
    height: 45px !important;
  }

  .gantt_task .gantt_task_scale .gantt_scale_cell {
    line-height: 30px !important;
    height: 28px !important;
  }
</style>