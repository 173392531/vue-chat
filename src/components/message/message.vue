<template>
    <div class="body">
        <!-- 头部导航栏 -->
        <topbar ref="topbarchild"></topbar>
        <folder ></folder>
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

            <!-- 搜索框 -->
            <van-search
                v-model="SearchValue"
                :shape="bakcSearchShame"
                :background="bakcSearchColor"
                :placeholder="$t('m.请输入搜索关键词')"
                maxlength="20"
            />
            <!-- 展示用户列表 -->
            <van-list
            v-if="isAjax&&nowMessageList"
            class="van_user_list"
            >
                <van-cell 
                :title="item.friend.name"
                v-for="(item,index) in nowMessageList" 
                :key="index"
                class="cell_avator"
                @click="getActiveId_x(item._id)"
                :class="`back-${backType}`">
                    <van-image
                        :src="item.friend.avatar"
                        round
                        width="3rem"
                        height="3rem"
                        class="avatar_round"
                    />
                    <!--预览信息-->
                    <p class="cell_text" :class="`back_color-${backType}`">
                        {{item.list[item.list.length-1].message}}
                    </p>
                    <p class="cell_time" :class="`back_color-${backType}`">
                        {{item.list[item.list.length-1].time}}
                    </p>
                    <van-badge class="cell_badge" :content="`${item.list.length}`" max="99" color="isShowedText"/>
                </van-cell>
            </van-list>
        </van-pull-refresh>
        <more-dialog width="80%" height="30%" top="35vh" title="设置" :visible="more_show">
            <div class="select_box">
                <div class="change_lang_box">
                    <div class="changeLang_text">
                        <span>{{$t('m.切换语言')}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span :class="inner_switch_lang?'':'showRed'">中</span>
                        <img src="../../assets/change_lang.svg" alt="">
                        <span :class="inner_switch_lang?'showRed':''">英</span>
                    </div>
                    <div><van-switch v-model="inner_switch_lang" @change="changeLang" size="24px" /></div>
                </div>
            </div>
        </more-dialog>
    </div>
</template>

<script>
import topbar from '../msgtopBar/topbar.vue'
import folder from '../left_folder/folder.vue'
import { Toast } from 'vant';
import { mapState, mapGetters, mapMutations } from 'vuex'
import MoreDialog from '../msgtopBar/moreDialog/moredialog.vue'
export default {  
    data() {
        return {
            isLoading: false,
            bakcSearchColor:'white',
            bakcSearchShame:'round',
            SearchValue:'',
            isShowedText:'',
            inner_switch_lang:false
        };
    },
    computed: {
        ...mapGetters(['nowMessageList']),
        // ajax是否已经结束
        ...mapState(['isAjax','backType','more_show','checked_lang'])
    },
    mounted(){
        // setTimeout(()=>{
            console.log('nowMessageList',this.nowMessageList);
            this.inner_switch_lang=this.checked_lang
        // },1000)
    },
    watch:{

        checked_lang(val){
            console.log('lang',val,this.inner_switch_lang);
            if(this.inner_switch_lang==true){
              this.$i18n.locale = 'en-US'
              this.$refs.topbarchild.initLang();
            }else{
              this.$i18n.locale = 'zh-CN'
              this.$refs.topbarchild.initLang();
            }
        }
    },
    methods: {
        ...mapMutations(['showDialog', 'getActiveId', 'zeroRemove', 'removeMessage','changeLang']),
        // 获取点击的friend的_id
        getActiveId_x(id) {
            this.getActiveId({ activeId: id })
            this.showDialog()
        },
        onRefresh() {
            setTimeout(() => {
                Toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
    },
    components:{
        topbar,
        folder,
        MoreDialog
    }
}
</script>

<style lang="scss" scoped>
.body{
    .select_box{
        .change_lang_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .changeLang_text{
                width: 55vw;
                display: flex;
                align-items: center;
                // vertical-align: middle;
                .showRed{
                    color: red;
                }
                span{
                    font-size: 16px;
                    color: rgb(15, 106, 107);
                }
                img{
                    width: 22px;
                    height: 22px;
                    // vertical-align: baseline;
                }
            }
        }
    }
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
        .icon_ell{
            padding-right: .5rem;
        }
    }
    .back-sea{
        background: url('../../assets/sea_background.png') no-repeat;
        background-position:0 75%;
        background-size: 100vw 35vh;
    }
    .back-city{
        background: url('../../assets/city_background.jpeg') no-repeat;
        background-position:0 75%;
        background-size: 100vw 35vh;
    }
    .back-starrysky{
        background: url('../../assets/back_dark_starry.jpeg') no-repeat;
        background-position:0 55%;
        background-size: 100vw 35vh;
    }
    .cell_avator{
        width: 100%;
        height: 5rem;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        .avatar_round{
            position: absolute;
            left: .5rem;
            top: .5rem;
        }
        .cell_text{
            position: absolute;
            left: 4.5rem;
            top: 1.2rem;
        }
        .cell_time{
            position: absolute;
            right: 1rem;
            top: -0.45rem;
        }
        .cell_badge{
            position: absolute;
            right: 1rem;
            top: 2.3rem;
        }
        .back_color-sea{
            color: #00FFFF;
            font-weight: 600;
            font-size: 16px;
        }
        .back_color-city{
            color: #CC00FF;
            font-weight: 600;
            font-size: 16px;
        }
        .back_color-starrysky{
            color: #999999;
            font-weight: 600;
            font-size: 16px;
        }
        .van-cell__title{
            position: absolute !important;
            left: 5.5rem;
            top: 1rem;
            background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
            -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
            -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
            -webkit-background-size: 200% 100%; 
            -webkit-animation: masked-animation 4s linear infinite;
            font-size: 14px; 
        }
        @keyframes masked-animation {
            0% {
                background-position: 0  0;
            }
            100% {
                background-position: -100%  0;
            }
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