/**
 * 绘图工具管理
 * canvas manager 创建 管理
 */
import {PenTool,EraserTool} from './ShapeTool'

const toolRelated = {
    'pen':PenTool,
    'eraser':EraserTool
}

const viceToolRelated = {
    'color':{
        htmlBuilder: ({strokeStyle}) => {   
           return `<div class='hover_link'>
                        <button class="tool_but,tool_color">change color</button>
                        <div class="list_show">
                            <input type="color" value="${strokeStyle}" >
                        </div>
                    </div>`
        },
        register:($rootElement,toolManager)=>{
            $rootElement.find('input[type=color]').on('change',function(event){
                toolManager.setCurrentStyle({strokeStyle:event.target.value})
            })
        }
    }
}

 class ToolManager{
    canvasManagerList =[]
    shapeTools=[]

    currentStyle = {lineWidth:10,strokeStyle:'#ffffff'}

    constructor({canvasManager,tools,$rootElement,style={},viceTools}){
        if(canvasManager)this.addCanvasManager(canvasManager)
        const toolContainer = document.createElement('div')
        toolContainer.classList.add('edit_tools_container')
        $rootElement.append(toolContainer) 
        const $toolContainer = Zepto(toolContainer)
        this.$toolContainer = $toolContainer
        this.initTools(tools,$toolContainer)
        this.initViceTools(viceTools,Zepto(toolContainer))
        this.currentStyle = {...this.currentStyle,style}
        //this.register()
    }

    addCanvasManager(canvasManager){
        this.canvasManagerList.push[canvasManager]
        this.currentCanvasManager = canvasManager
    }

    initTools(tools=[],$rootElement){
        tools.forEach((item,index) => {
            const ShapeTool = toolRelated[item]
            if(!ShapeTool)return
            const editButton = document.createElement('button')
            const className = 'tool_'+item
            editButton.classList.add('tool_but')
            editButton.classList.add(className)
            //editButton.textContent = item
            $rootElement.append(editButton)
            const shapeTool = new ShapeTool()
            editButton.onclick = ()=>{
                this.changeTool(shapeTool,className)
            }
            if(index === 0){
                this.changeTool(shapeTool,className)
            }
        })
    }

    initViceTools(tools=[],$rootElement){
        const {strokeStyle} = this.currentStyle
        tools.forEach(item => {
            const viceTool = viceToolRelated[item]
            if(!viceTool)return
            $rootElement.append(viceTool.htmlBuilder({strokeStyle}))
            viceTool.register($rootElement,this)
        })
    }

    changeTool(shapeTool,className){
        if(this.currentShapeTool)this.currentShapeTool.unRegister()
        this.currentShapeTool = shapeTool
        //shapeTool.setRootElementOffset(this.rootElementOffset)
        shapeTool.register(this.currentCanvasManager)
        this.setCurrentStyle()
        //this.updateParentElementOffset()
        this.$toolContainer.find('.tool_but').removeClass('active')
        this.$toolContainer.find('.'+className).addClass('active')
    }

    setCurrentStyle(param={}){
        this.currentStyle = {...this.currentStyle,...param}
        if(this.currentShapeTool)this.currentShapeTool.setCurrentStyle(this.currentStyle)
    }

    getCurrentCanvasImage(){
        return this.currentCanvasManager.saveImg()
    }

    getCurrentCanvasIsEdit(){
        return this.currentCanvasManager.shapeList.length > 0
    }

    // updateParentElementOffset = () =>{
    //     setTimeout(()=>{
    //         this.rootElementOffset = Zepto(this.currentCanvasManager.canvasElement).offset()
    //         if(this.currentShapeTool)this.currentShapeTool.setRootElementOffset(this.rootElementOffset)
    //     })
        
    // }

    // register(){
    //     window.addEventListener('resize',this.updateParentElementOffset)
    // }

    // destroy(){
    //     window.removeEventListener('resize',this.updateParentElementOffset)
    // }

}

export default ToolManager