<template>
  <div class="hello">
    <van-tabbar v-model="active" @change="handleChange">
      <van-tabbar-item icon="chat-o">消息</van-tabbar-item>

      <van-tabbar-item>
        <span>朋友</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item icon="star-o">动态</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'bottomTab',
  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
      bottomNav:'message',
      arrRouter:['message','friend','discover'],
      redirectRouterName:''
    }
  },
  mounted(){
    console.log(window.location.hash);
    this.redirectRouterName=this.searchIndex(this.renderRouter())
    console.log('this.redirectRouterName',this.redirectRouterName);
    this.active=this.redirectRouterName
  },
  methods:{
    handleChange(val) {
      console.log(val);

      this.bottomNav = val
      // 路由跳转至当前点击的页面
      this.$router.push(this.arrRouter[val])
      // 改变title
      // this.$store.commit('changTitle', { title: val })
    },
    renderRouter(){
      let str=window.location.hash
      str=str.slice(2)
      console.log('str',str);
      
      return str
    },
    searchIndex(str){
        let len = this.arrRouter.length;
        for(let i=0;i<len;i++){
          if(str===this.arrRouter[i]){
            return i
          }
        }
        return 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
