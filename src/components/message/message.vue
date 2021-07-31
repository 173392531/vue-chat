<template>
    <div class="body">
        <!-- 头部导航栏 -->
        <topbar />

        <!-- 下拉刷新 -->
        <van-pull-refresh class="van_pull_refresh" v-model="isLoading" :head-height="80" @refresh="onRefresh">
            <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
            <template #pulling="props">
                <img
                class="doge"
                src="https://img01.yzcdn.cn/vant/doge.png"
                :style="{ transform: `scale(${props.distance / 80})` }"
                />
            </template>

            <!-- 释放提示 -->
            <template #loosing>
                <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
            </template>

            <!-- 加载提示 -->
            <template #loading>
                <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
            </template>
        </van-pull-refresh>
    </div>
</template>

<script>
import topbar from '../msgtopBar/topbar.vue'
export default {
    components:{
        topbar
    }
}
</script>

<style lang="scss" scoped>
.body{
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
            // position: absolute;
            // left: .5rem;
            // top: .5rem;
        }
        .background_theme_btn{
            
        }
        .icon_ell{
            padding-right: .5rem;
        }
    }
    .van_pull_refresh{
        height: 80vh;
    }
    .doge {
        width: 140px;
        height: 72px;
        margin-top: 8px;
        border-radius: 4px;
    }

}
</style>