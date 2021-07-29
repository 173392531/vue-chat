<template>
  <div id="app">
    <router-view></router-view>
    <div class="container-bottom">
      <bottom-tab class="tab"></bottom-tab>
    </div>
  </div>
</template>

<script>
import bottomTab from './components/bottomTab/bottom-tab.vue'
export default {
  name: 'App',
  components:{
    bottomTab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
