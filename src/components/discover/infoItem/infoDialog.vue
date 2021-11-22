<template>
  <div class="infoitem_wrapper">
      <!-- 头部头像信息区 -->
      <div class="header">
          <el-avatar :size="40" :src="info.avatar"></el-avatar>
          <div class="name">
              <span class="name_line">{{info.name}}</span>
              <span class="date_line">{{info.date}}</span>
          </div>
              <el-dropdown trigger="click" @command="handleCommand">
                <div class="more_wrapper">
                    <img src="../../../assets/more.svg" alt="">
                </div>
                <el-dropdown-menu slot="dropdown" class="drop-down-list">
                    <el-dropdown-item icon="el-icon-s-comment">评论</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete-solid" v-if="info.name === 'rick'" :command="{type:'delete',val:info._id}">删除</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-promotion">转发</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
      </div>

      <!-- 主体内容区域 -->
      <div class="main_body">
          <div v-if="info.info.text">
              <span>{{info.info.text}}</span>
          </div>
          <div v-if="info.info.img" class="img_wrapper">
              <img :src="info.info.img" alt="">
          </div>
          <div v-if="info.info.link">
              <a :href="info.info.link">点我</a>
          </div>
      </div>

      <!-- 底部分割板 -->
      <div class="bottom_area">

      </div>

  </div>
</template>

<script>
import  {delDiscover} from '@/api/api.js'
export default {
    props:{
        info:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            // showText: false,
            // showImg: false
        }
    },
    // watch:{
    //     info(val){
    //         if(val.info.type === '')
    //     }
    // },
    mounted(){

    },
    methods:{
        async handleCommand(command){
            console.log('!command',command);
            const {type, val} = command
            if(type === 'delete'){
                const res = await delDiscover(val)
                if(res){
                    console.log('!aaaaaaaa');
                    this.$emit('collectData')
                }
            }
        },
    }
}
</script>

<style lang="scss">
.infoitem_wrapper{
    // border: 1px solid blue;
    overflow-x: hidden;
    // border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    .header{
        display: flex;
        .name{
            flex: 1;
            .name_line{
                display: block;
                font-size: 16px;
                line-height: 17px;
                font-weight: 500;
                margin-top: 3px;
            }
            .date_line{
                color: gray;
                font-size: 13px;
                line-height: 14px;
            }
        }
        .more_wrapper{
            width: 22px;
            height: 22px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .el-dropdown{
            height: 22px !important;
        }
    }
    .main_body{
        .img_wrapper{
            max-width: 100vw;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    // .bottom_area{
    //     height: 10px;
    //     background: #DCDCDC;
    // }
}
.drop-down-list{
    margin-top: 4px !important;
    margin-left: 4px !important;
}
</style>