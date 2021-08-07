<template>
  <div class="top_bar">
    <van-icon name="arrow-left" class="left_arrow" size="24" @click="showDialog_x"/>
  </div>
</template>

<script>
import {  mapMutations } from 'vuex'
export default {
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
    background-color: pink;
    display: flex;
    align-items: center;
    .left_arrow{
        margin-left: 1rem;
    }
}
</style>