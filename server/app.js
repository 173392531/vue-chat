const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
let cors = require('koa-cors');
const DB = require('./model/db');
// 解析request的body的功能(post请求)
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
/* 实例化外部依赖 */
// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

app.use(cors())
router.get('/msg',async (ctx)=>{
    const info = await DB.find('shq')
    console.log('!!!ctx',ctx.query);
    console.log('!info',info);
    ctx.body='hello KoaRouter!'
})
router.get('/search/img',async (ctx)=>{
    const searchType = ctx.query.value
    const getPic = await DB.find('shq',{"type":searchType})
    console.log('!searchType',getPic);
    ctx.body=getPic
})

// 请求动态列表的数据
router.get('/discover/list',async (ctx)=>{
  const getPic = await DB.find('discover')
  getPic.forEach(item => {
    item.numberDate  = Number(item.date.match(/\d+/g).join(''))
  })
  getPic.sort((a,b)=>b.numberDate - a.numberDate)
  console.log('!searchType',getPic);
  ctx.body=getPic
})

// 存放新增数据
router.post('/discover/saveList',async (ctx)=>{
  console.log('!ctx',ctx.request.body);
  const addData = ctx.request.body
  const saveData = await DB.insert('discover',addData)
  if(saveData){
    ctx.response.status = 200
    ctx.response.message = 'publish success'
  }
})

// 删除动态列表的数据
router.get('/discover/delete',async (ctx)=>{
  let id=ctx.query._id;
  // const obj = ctx.request.body
  // let id
  // for(let keyid in obj){
  //   id = keyid
  // }
  console.log('!ctxddddddquery', id);
  const delPic = await DB.remove('discover',{"_id":DB.getObjectId(id)})
  if(delPic){
    ctx.response.status = 200
    ctx.response.message = 'publish success'
  }
  console.log('!del',delPic);
})


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

router.get('/',async (ctx)=>{
    ctx.body='this is /'
    console.log(!'routerctx',ctx);
})

// 开启 监听端口
// wsApp.listen(3020, () => {console.log('server is running at 3020')});
 
app.listen(3020)