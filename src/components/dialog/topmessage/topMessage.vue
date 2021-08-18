<template>
  <div class="top_bar">
    <van-icon name="arrow-left" class="left_arrow" size="24" @click="showDialog_x"/>
    <span class="title_name">{{userData.friend.name}}</span>
    <!-- <el-color-picker v-model="color1"></el-color-picker> -->
    <van-icon name="apps-o" class="right_more" size="24" />
  </div>
</template>

<script>
import {  mapMutations } from 'vuex'
export default {
  props:{
    userData:{
      default:'',
      type:Object
    }
  },
  data(){
    return{
      // color1:null
    }
  },
  mounted(){
    console.log('!userData',this.userData);
    
  },
  methods:{
      ...mapMutations(['showDialog', 'getActiveId']),
      showDialog_x() {
        this.showDialog()
        this.getActiveId({ activeId: 0 })
      },
  }
}
</script>

<style lang="scss">
.top_bar{
    width: 100vw;
    height: 8vh;
    background-color: rgb(219, 226, 204);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_arrow{
        margin-left: 1rem;
    }
    .title_name{
      font-size: 18px;
    }
    .right_more{
      margin-right: 1rem;
    }
}
</style>