<template>
  <div class="dialog_wrapper">
    <top-message />
    <my-dialogue :userData="userData"
                   class="dialogue"
                   ></my-dialogue>
    <van-field
        v-model="myvalue"
        left-icon="smile-o"
        placeholder="输入文字"
        @keyup.enter.native="sendValue"
        maxlength="16"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myDialogue from './dialogue'
import topMessage from './topMessage.vue'
export default {
  name: 'dialog',
  components: {
    myDialogue,
    topMessage
  },
  data() {
    return {
      value: '',
      timer: {},
      myvalue:''
    }
  },
  computed: {
    ...mapState({
      self: state => state.data.self,
      headerTitle: 'headerTitle'
    }),
    userData() {
      return {
        self: this.self,
        friend: this.$store.getters.friend
      }
    }
  },
  methods: {
    ...mapMutations(['showDialog', 'getActiveId', 'showPersonindex']),
    showDialog_x() {
      this.showDialog()
      this.getActiveId({ activeId: 0 })
      this.$router.push(this.headerTitle)
    },
    showPersonindex_x() {
      this.showDialog()
      this.showPersonindex()
      this.$router.push(this.headerTitle)
    },
    sendValue() {
      if (this.myvalue.length) {
        this.$store.dispatch('sendValue', {
          _id: this.userData.friend._id,
          message: this.myvalue,
          that: this
        })
      } else {
        console.log('不能为空')
      }
      this.myvalue = ''
    },
    // // 输入框获得焦点时触发
    // focus() {
    //   this.timer.T = setInterval(() => {
    //     // 完美解决输入框被软键盘遮挡
    //     this.$refs.footer.scrollIntoView(false)
    //   }, 200)
    // },
    // blur() {
    //   // 输入框失去焦点时清除定时器
    //   clearInterval(this.timer.T)
    // }
  }
}
</script>

<style>
.dialog_wrapper{
    width: 100%;
    height: 100%;
}
</style>