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
@mixin avator-url($svg) {
  background: $svg 0 0 no-repeat;
  background-size: 100% 100%;
}
%talk_body{
    font-size: 14px;
    max-width: 14rem;
    padding: .4rem;
    background-color: #ffffff;
    top: 1rem;
    position: absolute;
    border-radius: 8px;
}
%arrow_generality{
    position: absolute;
    top: 1.2rem;
}
.arror_wrapper{
    background-color: #ececf6;

    .talk_body-leftAvatar{
        @extend %talk_body;
        left: 4.4rem;
    }
    .talk_body-rightAvatar{
        @extend %talk_body;
        right: 4.4rem;
    }
    .arrow_img{
        width: 1.5rem;
        height: 1.5rem;
    }
    .arrow-rightAvatar{
        @extend %arrow_generality;
        @include avator-url(url('../../../../assets/right_arrow.svg'));
        right: 3.5rem;
    }
    .arrow-leftAvatar{
        @extend %arrow_generality;
        @include avator-url(url('../../../../assets/left_arrow.svg'));
        left: 3.5rem;
    }
}
</style>