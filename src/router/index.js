import Vue from 'vue'
import Router from 'vue-router'
// 导入组件
import message from '../components/message/message.vue'
import friend from '../components/friend/friend.vue'
import discover from '../components/discover/discover.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/message', name: 'message', component: message },
    { path: '/friend', name: 'friend', component: friend },
    { path: '/discover', name: 'discover', component: discover },
    { path: '/' , redirect:{name:'message'}}
  ]
})
