
<script>
export default {
    data () {
        return {
            message: '', // 消息文字
            duration: 3000, // 显示时长，毫秒
            closed: false, // 用来判断消息框是否关闭
            timer: null, // 计时器
            visible: false, // 是否显示
            type:'success' // 图标类型
        }
    },
    computed: {
      typeClass() {
        return this.type
          ? `tos-icon-${ this.type }`
          : '';
      },
    },
    watch: {
        closed (newVal) {
            if (newVal) {
                this.visible = false
                setTimeout(()=>{
                    this.destroyElement()
                },300)
            }
        }
    },

    mounted () {
        this.startTimer()
    },
    methods: {
        destroyElement () {
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el)
        },
        startTimer () {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                this.closed = true
                clearTimeout(this.timer)
                }
            }, this.duration)
        }
    }
}
</script>

<template>
    <transition name="message-fade">
        <div class="toast" v-show="visible">
            <img src="./img/success.svg" alt="">
            <span class="inner_text">{{ message }}</span>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    .toast {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translate(-50%, 0);
        // margin-left: -51px;
        min-width: 102px;
        height: 24px;
        padding: 4px 16px;
        text-align: center;
        background: #FFFFFF;
        border: 1px solid #EEEFF1;
        box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        img{
            vertical-align: middle;
        }
        .inner_text{
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
            color: #2F2E3F;
        }
        .tos-icon-success{
            width: 24px;
            height: 24px;
            background:url('./img/success.svg')
        }
    }
    .message-fade-enter-active,
    .message-fade-leave-active {
        transition: all 0.3s linear;
    }
    .message-fade-enter,
    .message-fade-leave {
        opacity: 0;
        transform: translateY(100%);
    }
    .message-fade-leave-to {
        opacity: 0;
        transform: translateY(100%);
    }
</style>