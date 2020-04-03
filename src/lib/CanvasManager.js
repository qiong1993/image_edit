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
        const baseHtml = `<div class="canvas_container">
            <canvas id="${currentCanvasId}"></canvas></div>
        `
        $rootElement.append(baseHtml)
        const canvasElement = document.getElementById(currentCanvasId)
        const canvasContext = canvasElement.getContext("2d")
        
        this.canvasElement = canvasElement
        this.canvasContext = canvasContext
        
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
    }

    initBackImage(imgPath){
        const {canvasElement,canvasContext} = this
        const image = new Image()
        image.src = imgPath
        canvasElement.parentNode.style.background = `url(${imgPath}) center center / 100% `
        image.onload = function(){
            const canvasContainerElement = canvasElement.parentNode.parentNode
            let width = canvasContainerElement.offsetWidth
            const maxHeight = canvasContainerElement.parentNode.offsetHeight
            
            const imageWidth = image.width
            const imageHeight = image.height

            let actualHeight = parseInt((width/imageWidth)*imageHeight)
            
            if(actualHeight > maxHeight){
                actualHeight = maxHeight
                width =  parseInt((actualHeight/imageHeight)*imageWidth)
            }
            if(window.devicePixelRatio){
                canvasElement.style.width = width + 'px'
                canvasElement.style.height = actualHeight+ 'px' 
                canvasElement.width = width*window.devicePixelRatio
                canvasElement.height = actualHeight*window.devicePixelRatio
                canvasContext.scale(window.devicePixelRatio,window.devicePixelRatio)
            }else{
                canvasElement.width = width
                canvasElement.height = actualHeight
            }
            
            canvasContext.drawImage(image,0,0,width,actualHeight)
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