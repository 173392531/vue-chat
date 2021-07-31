<template>
  <div >
      <van-popup v-model="show" position="left" :style="{ width: '50%',height:'100%' }">内容</van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  mounted(){
    this.$root.eventBus.$on('changeLeftState',this.changeState)
  },
  methods:{
    changeState(val){
      this.show=val
    }
  }
}
</script>

<style>

</style>