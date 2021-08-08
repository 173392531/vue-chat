export default{
    bind:function (el,binding) {
        const options=binding.value
        console.log('bindoptions',options);
        
        const {className,activeIndex,activeClass}=options
        const children=el.getElementsByClassName(className) 
        console.log('bindchildren',children);
        if(activeIndex!=-1){
            children[activeIndex].className+=` ${activeClass}`
        }
        // console.log('bindoptions',options);
    },
    update:function (el,binding) {
        console.log('我进入update了');
        
        // debugger
        const options=binding.value
        const oldOptions=binding.oldValue
        if(options.activeIndex==oldOptions.activeIndex)return
        const {className,activeIndex,activeClass}=options
        const children=el.getElementsByClassName(className)
        const {activeIndex:oldIndex}=oldOptions
        if(activeIndex!=-1){
            children[activeIndex].className+=` ${activeClass}`
        }
        if(oldIndex!==-1){
            console.log('我把老index消灭了',oldIndex);
            
            children[oldIndex].className=className
        }
        // debugger
    }
}