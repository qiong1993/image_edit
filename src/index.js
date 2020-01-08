import './index.scss'
import CanvasManager from './lib/CanvasManager'
import ToolManager from './lib/ToolManager'

const defaultOptions = {
    el:'image_container',
    tools:['pen','eraser'],//绘制工具
    viceTools:['color'],//辅助工具
}


class ImageEdit {

    constructor(param={}){
        this.options = {...defaultOptions,...param}
        this.init()
    }
    
    init() {
        const {options} = this
        const {imgPath,width,height,viceTools,tools} = options
        const $rootElement = $('#'+options.el);
        if(!$rootElement){
            const rootElement = document.createElement('div')
            rootElement.setAttribute('id',options.el)
            $(body).append(rootElement)
            $rootElement = $(rootElement)
        }
        $rootElement.addClass('image_edit_container')
        $rootElement.html('')
        const canvasManager  = new CanvasManager($rootElement,{imgPath,width,height})
        const toolManager = new ToolManager({canvasManager,tools,$rootElement,viceTools})
        this.toolManager = toolManager
    }

    getCurrentImage(){
        return this.toolManager.getCurrentCanvasImage()
    }

    destroy(){
        $('#'+options.el).empty()  
        this.toolManager.destroy()
        this.toolManager= null
    }
}

export default ImageEdit