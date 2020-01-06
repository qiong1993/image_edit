/**形状绘制工具 */
import {Pen,Eraser} from './Shape'

function getEventTarget(event){
    return event.touches ? event.touches[0] : event
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

    onMouseDown = ()=>{
        const {Shape,currentStyle} = this
        const {canvasElement,canvasContext} = this.currentCanvasManager
        const e = getEventTarget(event)
        const disX = e.clientX - canvasElement.offsetLeft
        const disY = e.clientY - canvasElement.offsetTop
        const {lineWidth,strokeStyle} = currentStyle
        this.currentShape = new Shape({lineWidth,strokeStyle,startPos:[disX,disY]})
        this.currentShape.draw(canvasContext)

        document.addEventListener('mousemove',this.onMouseMove)
        document.addEventListener('touchmove',this.onMouseMove)
        document.addEventListener('mouseup',this.onMouseUp)
        document.addEventListener('touchend',this.onMouseUp)
        document.addEventListener('touchcancel',this.onMouseUp)
    }

    onMouseMove = () => {
        const {canvasElement,canvasContext} = this.currentCanvasManager
        const e = getEventTarget(event)
        const disX = e.clientX - canvasElement.offsetLeft
        const disY = e.clientY - canvasElement.offsetTop
        this.currentShape.addPoint([disX,disY],canvasContext)
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

    onMouseMove = () => {
        const {canvasElement,canvasContext,originContext} = this.currentCanvasManager
        const e = getEventTarget(event)
        const disX = e.clientX - canvasElement.offsetLeft
        const disY = e.clientY - canvasElement.offsetTop
        this.currentShape.addPoint([disX,disY],canvasContext,originContext)
    }
}

export  {PenTool,EraserTool}