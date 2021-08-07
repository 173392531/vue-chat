<template>
        <div class="top_bar_line">
            <van-image
                class="avator"
                round
                width="3rem"
                height="3rem"
                :src="require('../../assets/avator_rick.jpg')"
                @click="setStateLeft"
                />
            <van-popover v-model="showPopover" trigger="click" class="background_theme_btn">
                    
                <van-grid
                    :gutter="5"
                    square
                    clickable
                    :border="false"
                    column-num="3"
                    style="width: 240px;"
                >
                    <van-grid-item
                    @click="choseBackTip('sea')"
                    >
                        <van-image :src="require('../../assets/sea.svg')" />
                        {{$t('m.海洋')}}
                    </van-grid-item>
                    <van-grid-item
                    @click="choseBackTip('starrysky')"
                    >
                        <van-image :src="require('../../assets/starry_sky.svg')" />
                        {{$t('m.星空')}}
                    </van-grid-item>
                    <van-grid-item
                    @click="choseBackTip('city')"
                    >
                        <van-image :src="require('../../assets/city.svg')" />
                        {{$t('m.城市')}}
                    </van-grid-item>
                </van-grid>
                <template #reference>
                    <van-button icon="like-o" :text="$t('m.主题心情')" color="linear-gradient(to right, #ff6034, #ee0a24)" round></van-button>
                </template>
            </van-popover>

            <van-popover v-model="showRightPopover" trigger="click" :actions="actions" @select="select" class="right_pop" placement="bottom-end">
                <template #reference>
                    <van-icon name="ellipsis" class="icon_ell" size="24" />
                </template>
            </van-popover>
        </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      showPopover: false,
      showRightPopover: false,
      actions: [
        { id: 0 , text: '', icon: 'add-o' },
        { id: 1 , text: '', icon: 'music-o' },
        { id: 2 , text: '', icon: 'more-o' },
      ]
    };
  },
  computed:{
      com_lang(){
          return [
            this.$t('m.上传'),
            this.$t('m.音乐'),
            this.$t('m.更多'),
          ]
      }
  },
  methods: {
      ...mapMutations(['changeBackType','changeMoreDialogState']),
      setStateLeft(){
          this.$root.eventBus.$emit('changeLeftState',true)
      },
      choseBackTip(type){
          this.changeBackType(type)
          this.showPopover = false
      },
      select(val){
          console.log(val);
          if(val.id==2){
             this.changeMoreDialogState()
          }
          this.initLang()
      },
      //   初始化语言
      initLang(){
          for(let i=0;i<this.com_lang.length;i++){
              this.actions[i].text=this.com_lang[i]
          }
      }
  },
  mounted(){
      this.initLang() 
  }
}
</script>

<style lang='scss' scoped> 
    .top_bar_line{
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5rem;
        .avator{
        }

        .icon_ell{
            padding-right: .5rem;
        }
    }
</style>