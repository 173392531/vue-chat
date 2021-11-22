<template>
  <div class="discover_area">
    <div class="banner">
      <img src="https://img1.baidu.com/it/u=2094840721,1916148361&fm=26&fmt=auto" alt="">
    </div>
    <div class="add" @click="addDiscover">
      <img class="iconAdd" src="../../assets/add.svg" alt="">
    </div>
    <div class="body-show" v-show="backData.length" v-for="item in backData" :key="item._id">
      <info-dialog :info="item" @collectData="collectData"></info-dialog>
    </div>
    <add-discover :discoverDrawer.sync="discoverDrawer" @collectData="collectData">

    </add-discover>
  </div>
</template>

<script>
import {collectDiscover} from '@/api/api.js'
import infoDialog from './infoItem/infoDialog.vue'
import addDiscover from '../addDiscover/addDiscover.vue'
export default {
  components:{
    infoDialog,
    addDiscover
  },
  data(){
    return {
      params:{
        page:0,
        author:''
      },
      backData:[],
      discoverDrawer:false
    }
  },
  async mounted(){
    await this.collectData()
  },
  methods:{
    async collectData(){
      const res = await collectDiscover(this.params)
      const { data, status } = res
      if(status === 200)this.backData = data
      console.log('!backData',this.backData);
    },
    addDiscover(){
      this.discoverDrawer=true
    },
    handleClose(){
      this.discoverDrawer=false
    }
  }
}
</script>

<style lang="scss">
.discover_area{
  padding-bottom: 50px;
  position: relative;
  .banner{
    width: 100vw;
    height: 25vh;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .add{
    width: 40px;
    height: 40px;
    position: absolute;
    right: 20px;
    top:18vh;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .body-show{
    max-width: 96vw;
    margin-left: 2vw;
    margin-bottom: .5vh;
    .infoitem_wrapper{
      padding: 4px;
    }
  }
}
</style>