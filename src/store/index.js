import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)

let state={
    // 对话框
    dialog: false,
    // 侧边栏
    sidebar: {
        open: false,
        docked: true
    },
    // 背景主题
    backType:'',
    // 用户主页
    personindex: false,
    // 搜索框
    search: false,
    // 导航栏标题
    headerTitle: 'message',
    // 初始化基础数据
    data: { self: {}, friends: [] },
    // ajax请求数据是否结束
    isAjax: false,
    // 当前被选中或者在聊天中的friend的_id
    activeId: 0,
    messageList: [
        {
          _id: 1,
          list: [{ _id: 1, message: '你好，请问看见派大星了吗', time: '9:28' }]
        }, {
          _id: 2,
          list: [{ _id: 2, message: '今天下午和我看电影去吧', time: '9:50' }]
        }, {
          _id: 3,
          list: [{ _id: 3, message: '代码写的不错，我愿收你为徒', time: '3:12' }]
        }
      ],
    // 消息队列副本，由于没有数据库，所以采用这样折中的方法
    messageListFB: [
        {
        _id: 1,
        list: [{ _id: 1, message: '兄弟，Vue.js会吗', time: '9:28' }]
        }, {
        _id: 2,
        list: [{ _id: 2, message: '今天下午开会', time: '9:50' }]
        }, {
        _id: 3,
        list: [{ _id: 3, message: '请问你要来点兔子吗', time: '3:12' }]
        }
    ],
    more_show:false,
    checked_lang:false,
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})  
export default store