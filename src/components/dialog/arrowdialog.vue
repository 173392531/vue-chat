<template>
  <div class="arror_wrapper">
      <div :class="`arrow-${pos}`" class="arrow_img"></div>
      <div :class="`talk_body-${pos}`">
          <slot />
      </div>
  </div>
</template>

<script>
export default {
    props:[
        'pos'
    ]
}
</script>

<style lang="scss">
.arror_wrapper{
    background-color: #ececf6;
    .talk_body-leftAvatar{
        font-size: 14px;
        max-width: 14rem;
        padding: .4rem;
        background-color: #ffffff;
        left: 4.4rem;
        top: 1rem;
        position: absolute;
        border-radius: 8px;
    }
    .talk_body-rightAvatar{
        font-size: 14px;
        max-width: 14rem;
        padding: .4rem;
        background-color: #ffffff;
        right: 4.4rem;
        top: 1rem;
        position: absolute;
        border-radius: 8px;
    }
    .arrow_img{
        width: 1.5rem;
        height: 1.5rem;
    }
    .arrow-rightAvatar{
        position: absolute;
        right: 3.5rem;
        top: 1.2rem;
        background: url('../../assets/right_arrow.svg') 0 0 no-repeat;
        background-size: 100% 100%;
    }
    .arrow-leftAvatar{
        position: absolute;
        left: 3.5rem;
        top: 1.2rem;
        background: url('../../assets/left_arrow.svg') 0 0 no-repeat;
        background-size: 100% 100%;
    }
}
</style>