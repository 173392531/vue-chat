<template>
  <div class="add_discover">
    <el-drawer
      title="添加新动态"
      :visible.sync="discoverDrawer"
      direction="btt"
      :before-close="handleClose"
      size="90vh"
    >
      <text-area 
        v-model="discoverText" 
        maxlength="500" 
        @add="handleClick"
        ref="testText">
        <div v-if="show">
          <div>
            <input type="text" v-model="form.text" placeholder="内容">
            <input type="text" v-if="type === 'link'" v-model="form.url" placeholder="链接">
          </div>
          <div>
            <button @click="goAdd">添加</button>
          </div>
        </div>
      </text-area>
      <div class="pub_icon" @click="addDiscover">
          <img src="../../assets/publish.svg" alt="">
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import textArea from "../textarea/index";
import {formatTime} from '@/tools/tools'
import {saveDiscover} from '@/api/api.js'
export default {
  components: {
    textArea
  },
  props: {
    discoverDrawer: {
      type: Boolean,
      default: false
    }
  },
  data(){
      return {
        discoverText:'',
        show:false,
        type:'',
        form: {
            text: '',
            url:''
        }
      }
  },
  computed:{
      ...mapState(['self'])
  },
  methods: {
    handleClose() {
      this.$emit("update:discoverDrawer", false);
    },
    handleClick(type){
        this.type = type
        if (type === 'tag' || type === 'link') {
            this.show = true
        } else {
            console.log(type)
        }
    },
    goAdd(){
        const type = this.type
        if(type === 'link'){
            const {text, url} = this.form
            this.addLink(text, url)
        }else if(type === 'tag'){
            this.addTag(this.form.text)
        }
        this.show = false
    },
    addTag (text) {
        this.$refs.testText.addTag(text)
    },
    addLink(text,url){
        this.$refs.testText.addLink(text,url)
    },
    async addDiscover(){
        console.log('!csl self',this.self);
        const baseConfig = {
            canForward:"true",
            comment:[],
            thumbsUp:[]
        }
        const params={
            ...this.self,
            info:{
                text:this.discoverText,
            },
            date:formatTime(new Date()),
            ...baseConfig
        }
        const res = await saveDiscover(params)
        if(res){
            this.$emit('collectData')
        }
    }
  }
};
</script>

<style lang="scss" scoped>
    .add_discover{
        position: relative;
        .pub_icon{
            width: 24px;
            height: 24px;
            cursor: pointer;
            position: absolute;
            left: calc(50% - 12px);
            top: 22px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
