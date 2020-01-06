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
        let {imgPath,width,height} = options
        const currentCanvasId = 'canvas' + Date.now()
        const originCanvasId = 'origin' + currentCanvasId
        const baseHtml = `
            <canvas class='originCanvas' id="${originCanvasId}"></canvas>
            <canvas id="${currentCanvasId}"></canvas>
        `
        $rootElement.append(baseHtml)

        const canvasElement = document.getElementById(currentCanvasId)
        const canvasContext = canvasElement.getContext("2d")
        const originElement = document.getElementById(originCanvasId)
        const originContext = originElement.getContext("2d")
        const image = new Image()
        image.src = imgPath
        image.onload = function(){
            width = width ? width : canvasElement.offsetWidth
            height = height ? height : canvasElement.offsetHeight
            canvasElement.width = width
            canvasElement.height = height
            canvasContext.drawImage(image,0,0,width,height)
            
            originElement.width = width
            originElement.height = height
            originContext.drawImage(image,0,0,width,height)
        } 

        this.imgInstance = image

        this.canvasElement = canvasElement
        this.canvasContext = canvasContext
        this.originContext = document.getElementById(originCanvasId).getContext("2d")
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