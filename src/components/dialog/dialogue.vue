<template>
  <div class="dialogue_wrapper">
      <div v-for="item of messageList_x" :key="item.id">
        <van-list
        class="list_wrapper"
        >
            <van-image
                round
                width="3rem"
                height="3rem"
                :class="item._id===0?'right_dia_avator':'left_dia_avator'"
                :src="item._id===0?userData.self[0].avatar:userData.friend.avatar"
            />
            <arrow-dialog :pos="item._id===0?'rightAvatar':'leftAvatar'">
                {{item.message}}
            </arrow-dialog>
        </van-list>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import arrowDialog from './arrowdialog.vue'
export default {
  name: 'dialogue',
  props: ['userData'],
  data(){
      return{
          
      }
  },
  computed: {
    ...mapGetters(['nowMessageList']),
    // 获取到当前的聊天记录
    messageList_x() {
      // 筛选信息
      let message = this.nowMessageList.filter(x => x._id === this.userData.friend._id)[0]
      return message.list
    }
  },
  components:{
    arrowDialog
  },
  mounted(){
      console.log('userData',this.userData);
  },
}
</script>

<style lang="scss">
.dialogue_wrapper{
    position: relative;
    width: 100vw;
    height: 70vh;
    background-color: #ececf6;
    .list_wrapper{
        width: 100vw;
        height: 4rem;
        position: relative;
    }
    .left_dia_avator{
        position: absolute;
        left: .5rem;
        top: .5rem;
    }
    .right_dia_avator{
        position: absolute;
        right: .5rem;
        top: .5rem;
    }
}
</style>