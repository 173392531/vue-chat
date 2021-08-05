<template>
  <div id="app">
    <div v-if="!dialog">
      <router-view></router-view>
    </div>
    <div v-show="!dialog" class="container-bottom">
      <bottom-tab class="tab"></bottom-tab>
    </div>

    <!--对话界面-->
    <div v-if="dialog" class="my-dialog">
      <my-dialog></my-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bottomTab from './components/bottomTab/bottom-tab.vue'
import myDialog from './components/dialog/dialog.vue'
export default {
  name: 'App',
  components:{
    bottomTab,
    myDialog
  },
  computed: mapState(['dialog']),
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
  .my-dialog{
    position: absolute;
    z-index:9999;
    width: 100vw;
    height: 100vh;
  }
}
</style>
