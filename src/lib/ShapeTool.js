/**形状绘制工具 */
import {Pen,Eraser} from './Shape'

function getCurrentPos(event,rootElement){
    const e = event.touches ? event.touches[0] : event
    const rootElementOffset = Zepto(rootElement).offset()
    const disX = e.pageX - rootElementOffset.left
    const disY = e.pageY - rootElementOffset.top
    return [disX,disY]
    
}
class ShapeTool{
    currentStyle={}

    constructor(props){

    }

    register(canvasManager){
        this.currentCanvasManager = canvasManager
        canvasManager.canvasElement.addEventListener('mousedown',this.onMouseDown)
        canvasManager.canvasElement.addEventListener('touchstart',this.onMouseDown)
    }

    unRegister(){
        this.currentCanvasManager.canvasElement.removeEventListener('mousedown',this.onMouseDown)
        this.currentCanvasManager.canvasElement.removeEventListener('touchstart',this.onMouseDown)
    }

    setCurrentStyle(style={}){
        this.currentStyle = {...this.currentStyle,...style}
    }

    // setRootElementOffset(offset){
    //     this.rootElementOffset = offset
    // }

    onMouseDown = ()=>{
        const {Shape,currentStyle} = this
        const {canvasContext,canvasElement} = this.currentCanvasManager
        const {lineWidth,strokeStyle} = currentStyle
        this.currentShape = new Shape({lineWidth,strokeStyle,startPos:getCurrentPos(event,canvasElement)})
        this.currentShape.draw(canvasContext)

        document.addEventListener('mousemove',this.onMouseMove)
        document.addEventListener('touchmove',this.onMouseMove)
        document.addEventListener('mouseup',this.onMouseUp)
        document.addEventListener('touchend',this.onMouseUp)
        document.addEventListener('touchcancel',this.onMouseUp)
    }

    onMouseMove = () => {
        const {canvasContext,canvasElement} = this.currentCanvasManager
        this.currentShape.addPoint(getCurrentPos(event,canvasElement),canvasContext)
    }

    onMouseUp = () => {
        this.currentCanvasManager.addDraw(this.currentShape)
        this.currentShape = null
        document.removeEventListener('mousemove',this.onMouseMove)
        document.removeEventListener('touchmove',this.onMouseMove)
        document.removeEventListener('mouseup',this.onMouseMove)
        document.removeEventListener('touchend',this.onMouseUp)
        document.removeEventListener('touchcancel',this.onMouseUp)
    }
    
}

class PenTool extends ShapeTool{

    constructor(props){
        super(props)
        this.Shape = Pen
    }

}

class EraserTool extends ShapeTool{
    constructor(props){
        super(props)
        this.Shape = Eraser
    }

    // onMouseMove = () => {
    //     const {canvasContext,originContext,canvasElement} = this.currentCanvasManager
    //     this.currentShape.addPoint(getCurrentPos(event,canvasElement),canvasContext,originContext)
    // }
}

export  {PenTool,EraserTool}