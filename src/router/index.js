import Vue from 'vue'
import Router from 'vue-router'
// 导入组件
import message from '../components/message/message.vue'
import friend from '../components/friend/friend.vue'
import discover from '../components/discover/discover.vue'
import topbar from '../components/msgtopBar/topbar.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/message', name: 'message', component: message , 
      children: [
        {
          path: 'topbar',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'topbar',
          component: topbar
        },
        // {
        //   path: 'trace',
        //   name: 'Trace',
        //   component: Trace
        // }
      ]
    },
    { path: '/friend', name: 'friend', component: friend },
    { path: '/discover', name: 'discover', component: discover },
    { path: '/' , redirect:{name:'message'}}
  ]
})
