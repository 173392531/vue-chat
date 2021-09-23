<script>
export default {
  data () {
    return {
      message: '', // 消息文字
      duration: null, // 显示时长，毫秒
      timer: null, // 计时器
      visible: false, // 是否显示
      type: 'info', // 图标类型
      width: null,
      isClose: null, // 用来判断消息框是否关闭
      closed: false, // 关闭提示的标识
      verticalOffset: 20,
      onClose: null,
      center: null,
      offset: null,
      ICON: {
        error: require('./img/error.svg'),
        info: require('./img/info.svg'),
        warning: require('./img/warning.svg'),
        success: require('./img/success.svg')
      }
    }
  },
  computed: {
    typeClass () {
      return this.type ? `tos-icon-${this.type}` : ''
    },
    positionStyle () {
      return {
        top: `${this.verticalOffset}px`
      }
    },
    iconType () {
      const type = this.type
      const res = this.ICON[type]
      return res
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
      }
    },
    visible (val) {
      if (val) {
        this.calculationLocation()
      }
    },
    verticalOffset (val) {
      console.log('!height', val)
    }
  },

  mounted () {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    destroyElement () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
    keydown (e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.closeTopMsg()
        }
      }
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.closeTopMsg()
          }
        }, this.duration)
      }
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    closeTopMsg () {
      // debugger
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    calculationLocation () {
      this.$nextTick(() => {
        const toasts = document.querySelectorAll('.toast')
        const len = toasts.length
        const toast = toasts[len - 1]
        toast.style.width = this.width + 'px'
        toast.style.left = (document.body.clientWidth - Number(this.width)) / 2 + 'px'
        console.log('!tosat', toast.style.width, document.body.clientWidth)
      })
    }
  }
}
</script>

<template>
  <transition name="message-fade" @after-leave="destroyElement">
    <div
      :class="['toast', type ? `msg-${type}` : '', center ? 'msg-center' : '']"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <img :src="iconType" alt="" /> <span class="inner_text">{{ message }}</span>
      <img src="./img/close.svg" alt="" class="close_icon" v-show="isClose" @click="closeTopMsg" />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  min-width: 102px;
  height: 48px;
  padding: 4px 16px;
  //   top:50px;
  box-sizing: border-box;
  text-align: center;
  transition: top 0.3s;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  display: flex;
  // justify-content: center;
  align-items: center;
  img {
    vertical-align: middle;
  }
  .close_icon {
    cursor: pointer;
    position: absolute;
    right: 12px;
  }
  .inner_text {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: rgba(31, 31, 31, 1);
    margin-left: 10px;
  }
}
.msg-center {
  justify-content: center;
}
.msg-info {
  background: #dfebff;
  border: 1px solid #529aff;
}
.msg-error {
  background: #fff2ed;
  border: 1px solid #fa6b69;
}
.msg-warning {
  background: #fffbe6;
  border: 1px solid #ffe47a;
}
.msg-success {
  background: rgba(206, 236, 230, 0.3);
  border: 1px solid #8ed5bb;
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s linear;
}
.message-fade-enter,
.message-fade-leave {
  opacity: 0;
  transform: translateY(-100%);
}
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
