import Vue from 'vue'
import topMsg from './topMsg.vue'

const ToastConstructor = Vue.extend(topMsg) // 构造函数
let instance // 实例对象
let seed = 1 // 计数
const instances = []
const maxQueue = []

// 使用方式：this.$TopMsg({1.文本内容message  2.提示类型type（分为info，warning，success，error四种）
// 3.宽度width(Number类型，不加String) 4.是否有关闭按钮isClose（true或false）
// 5.是否需要文案居中isCenter（如需center直接写isCenter:true）
// 6.距离顶部的高度offset（Number） 7.提示显示时间duration（Number）})
// 8.关闭动画时触发的回调onClose(Function) 9.maxCount最大同时存在的组件数量

const topMsgToast = (options = {}) => {
  const id = `toast_${seed++}`
  console.log('!optionns', options)
  if (typeof options === 'string') {
    options = {
      message: options
    }
  } else if (typeof options === 'object') {
    options = {
      message: options.text,
      type: options.type || 'info',
      width: options.width || 798,
      isClose: options.canClose,
      center: options.isCenter,
      offset: options.top,
      duration: options.duration ? options.duration : 3000,
      onClose: options.onClose,
      maxCount: options.maxCount
    }
  }
  const userOnClose = options.onClose
  options.onClose = function () {
    topMsgToast.closeTopMsg(id, userOnClose)
  }
  instance = new ToastConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  while (options.maxCount && instances.length >= options.maxCount) {
    maxQueue.push(instances[0])
    instances[0].onClose()
    console.log('!innst', instances)
  }
  let verticalOffset = options.offset || 20
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = 9999999 + seed
  instances.push(instance)
  maxQueue.forEach((item) => {
    console.log('!item', item, maxQueue)
    item.closeTopMsg()
    maxQueue.shift()
  })
  return instance.vm
}
topMsgToast.closeTopMsg = function (id, userOnClose) {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  console.log('!aaa', len, index, instances.length)
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight - 16 + 'px'
    console.log('!topheight', dom.style.top)
  }
}
export default topMsgToast
