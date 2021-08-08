<template>
  <div class="dialog_wrapper">
    <!-- 聊天界面头部栏 -->
    <van-sticky :offset-top="0">
      <top-message />
    </van-sticky>

    <!-- 对话框 -->
    <my-dialogue :userData="userData"
                   class="dialogue"
                   @scrollC="scrollC"
                   ></my-dialogue>    

    <!-- 锚点链接 -->
    <a 
    name="1"
    ref="clickEnd"
    href="#1"></a>

    <!-- 底部输入框 -->
    <van-sticky :offset-top="0" class="sticky_bottom">
      <van-tabbar>
            <van-field
                ref="input_text"
                v-model="myvalue"
                left-icon="smile-o"
                placeholder="输入文字"
                class="input_wrapper"
                @keyup.enter.native="sendValue"
            />
      </van-tabbar>
    </van-sticky>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myDialogue from './dialogue/dialogue.vue'
import topMessage from './topmessage/topMessage.vue'
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
    // 监听子组件事件
    scrollC() {
      // 取巧的方法，每次组件更新后模拟点击，破坏性的修改哈希值，但是简便（此处可以修改为正常控制滚动条）
      this.$refs.clickEnd.click()
      this.autoFocus()
    },
    autoFocus(){
      this.$refs.input_text.focus()
    }
  }
}
</script>

<style lang="scss">
$bottombar-height:80px;
.dialog_wrapper{
    .input_wrapper{
      height: $bottombar-height;
      bottom: 0;
    }
    .sticky_bottom{
      height: $bottombar-height;
      bottom: 0;
      .van-sticky{
        height: $bottombar-height;
        .van-tabbar{
          height: $bottombar-height;
        }
      }
    }
}
</style>