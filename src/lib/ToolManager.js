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
        this.initTools(tools,$(toolContainer))
        this.initViceTools(viceTools,$(toolContainer))
        this.currentStyle = {...this.currentStyle,style}
        this.register()
    }

    addCanvasManager(canvasManager){
        this.canvasManagerList.push[canvasManager]
        this.currentCanvasManager = canvasManager
    }

    initTools(tools=[],$rootElement){
        tools.forEach(item => {
            const ShapeTool = toolRelated[item]
            if(!ShapeTool)return
            const editButton = document.createElement('button')
            editButton.classList.add(['tool_but','tool_'+item])
            editButton.textContent = item
            $rootElement.append(editButton)
            const shapeTool = new ShapeTool()
            editButton.onclick = ()=>{
                this.changeTool(shapeTool)
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

    changeTool(shapeTool){
        if(this.currentShapeTool)this.currentShapeTool.unRegister()
        this.currentShapeTool = shapeTool
        shapeTool.setRootElementOffset(this.rootElementOffset)
        shapeTool.register(this.currentCanvasManager,this.rootElementOffset)
        this.setCurrentStyle()
        this.updateParentElementOffset()
    }

    setCurrentStyle(param={}){
        this.currentStyle = {...this.currentStyle,...param}
        if(this.currentShapeTool)this.currentShapeTool.setCurrentStyle(this.currentStyle)
    }

    getCurrentCanvasImage(){
        return this.currentCanvasManager.saveImg()
    }

    updateParentElementOffset = () =>{
        setTimeout(()=>{
            this.rootElementOffset = $(this.currentCanvasManager.canvasElement).offset()
            if(this.currentShapeTool)this.currentShapeTool.setRootElementOffset(this.rootElementOffset)
        })
        
    }

    register(){
        window.addEventListener('resize',this.updateParentElementOffset)
    }

    destroy(){
        window.removeEventListener('resize',this.updateParentElementOffset)
    }

}

export default ToolManager