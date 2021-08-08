<template>
  <div class="arror_wrapper" :style="pos=='leftAvatar'?'':'float:right'">
      <div v-show="pos=='leftAvatar'" class="arrow_img">
          <img :src="imgSrc" alt="">
      </div>
      <div :class="`talk_body-${pos}`">
          <slot />
      </div>
      <div v-show="pos=='rightAvatar'" class="arrow_img">
          <img :src="imgSrc" alt="">
      </div>
  </div>
</template>

<script>
import leftAvatar from  '../../../../assets/leftAvatar.svg'
import rightAvatar from  '../../../../assets/rightAvatar.svg'
export default {
    props:[
        'pos'
    ],
    computed:{
        imgSrc(){
            if(this.pos=='leftAvatar'){
                return leftAvatar
            }else{
                return rightAvatar
            }
        }
    },
}
</script>

<style lang="scss">
%talk_body{
    font-size: 14px;
    max-width: 14rem;
    padding: .4rem;
    background-color: #ffffff;
    border-radius: 8px;
    display: inline-block;
    margin-top: -4px;
}
%arrow_generality{
    position: absolute;
    top: 1.2rem;
}
.arror_wrapper{
    background-color: #ececf6;
    display: inline-block;
    margin:18px 0;
    .talk_body-leftAvatar{
        @extend %talk_body;
        margin-left: -.85rem;
    }
    .talk_body-rightAvatar{
        @extend %talk_body;
        margin-right: -.85rem;
    }
    .arrow_img{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: top;
        img{
            width: 100%;
            height: 100%;
            vertical-align: bottom;
        }
    }
}
</style>