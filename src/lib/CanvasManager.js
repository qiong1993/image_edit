/**
 * 管理笔触数据
 * draw 绘图
 * 绘笔切换
 * 
 */
class CanvasManager{

    shapeList=[]
    width;
    

    constructor($rootElement,options){
        this.initCanvas($rootElement,options)
    }

    initCanvas($rootElement,options={}){
        const currentCanvasId = 'canvas' + Date.now()
        const originCanvasId = 'origin' + currentCanvasId
        const baseHtml = `<div class="canvas_container">
            <canvas class='originCanvas' id="${originCanvasId}"></canvas>
            <canvas id="${currentCanvasId}"></canvas></div>
        `
        $rootElement.append(baseHtml)
        const canvasElement = document.getElementById(currentCanvasId)
        const canvasContext = canvasElement.getContext("2d")
        const originElement = document.getElementById(originCanvasId)
        const originContext = originElement.getContext("2d")
        const {imgPath,imgFile} = options
        if(imgFile){
            const reader = new FileReader();
            reader.onloadend = e => {
                this.initBackImage(e.target.result);
            };
            reader.readAsDataURL(imgFile)
        }else if(imgPath){
            this.initBackImage(imgPath)
        } 

        this.canvasElement = canvasElement
        this.canvasContext = canvasContext
        this.originElement = originElement
        this.originContext = originContext
    }

    initBackImage(imgPath){
        const {canvasElement,canvasContext,originContext,originElement} = this
        const image = new Image()
        image.src = imgPath
        image.onload = function(){
            const canvasContainerElement = canvasElement.parentNode
            let width = canvasContainerElement.offsetWidth
            const maxHeight = canvasContainerElement.parentNode.offsetHeight
            
            const imageWidth = image.width
            const imageHeight = image.height

            let actualHeight = parseInt((width/imageWidth)*imageHeight)
            
            if(actualHeight > maxHeight){
                actualHeight = maxHeight
                width =  parseInt((actualHeight/imageHeight)*imageWidth)
            }
            
            canvasElement.width = width
            canvasElement.height = actualHeight
            canvasContext.drawImage(image,0,0,width,actualHeight)
            
            originElement.width = width
            originElement.height = actualHeight
            originContext.drawImage(image,0,0,width,actualHeight)
        } 

        this.imgInstance = image
    }

    addDraw(shape){
        this.shapeList.push(shape)
    }

    saveImg(){
        const imageData = this.canvasElement.toDataURL("image/jpeg")
        return imageData
    }

    reset(){
        this.canvasContext.clearRect(0,0)
        this.canvasContext.drawImage(this.imgInstance, 0, 0)
    }
}

export default CanvasManager