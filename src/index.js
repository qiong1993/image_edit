//import './index.scss'
import CanvasManager from './lib/CanvasManager'
import ToolManager from './lib/ToolManager'

const defaultOptions = {
    el:'image_container',
    tools:['pen','eraser'],//绘制工具
    //viceTools:['color'],//辅助工具
}


class ImageEdit {

    constructor(param={}){
        this.options = {...defaultOptions,...param}
        this.init()
    }
    
    init() {
        const {options} = this
        const {imgPath,imgFile,viceTools,tools,rootElement,el} = options
        const $rootElement =  rootElement ? Zepto(rootElement) : Zepto('#'+el);
        if(!$rootElement){
            const rootElement = document.createElement('div')
            rootElement.setAttribute('id',options.el)
            Zepto(body).append(rootElement)
            $rootElement = Zepto(rootElement)
        }
        $rootElement.addClass('image_edit_container')
        $rootElement.html('')
        const canvasManager  = new CanvasManager($rootElement,{imgPath,imgFile})
        const toolManager = new ToolManager({canvasManager,tools,$rootElement,viceTools})
        this.toolManager = toolManager
    }

    getCurrentImage(){
        return this.toolManager.getCurrentCanvasImage()
    }

    getCurrentImageIsEdit(){
        return this.toolManager.getCurrentCanvasIsEdit()
    } 

    destroy(){
        Zepto('#'+options.el).empty()  
        //this.toolManager.destroy()
        this.toolManager= null
    }
}

export default ImageEdit