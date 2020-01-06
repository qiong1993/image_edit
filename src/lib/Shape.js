/**
 * 绘制形状
 */
class Shape{
    constructor(props){
        const {lineWidth,strokeStyle,startPos} = props
        this.lineWidth = lineWidth
        this.strokeStyle = strokeStyle
        this.startPos = startPos
        this.pointList = [] 
    }
    
}

class Pen extends Shape{
    constructor(props){
        super(props)
    }

    draw(canvasContext){
        const {lineWidth,strokeStyle,startPos} = this
        canvasContext.beginPath();
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = strokeStyle;
        canvasContext.moveTo(...startPos)
        if(this.pointList){
            this.pointList.forEach(point=>{
                canvasContext.lineTo(...point) 
                canvasContext.stroke()
            })
        }
    }

    addPoint(point,canvasContext){
        this.pointList.push(point)
        if(canvasContext){
            canvasContext.lineTo(...point) //鼠标点下去的位置
            canvasContext.stroke()
        }
    }

}

class Eraser extends Shape{
    draw(canvasContext,originContext){
        const {lineWidth,strokeStyle,startPos} = this
        canvasContext.beginPath();
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = strokeStyle;
        canvasContext.moveTo(...startPos)
        if(this.pointList && originContext){
            this.pointList.forEach(point=>{
                const [offsetX,offsetY]  = point
                let pxs = originContext.getImageData(offsetX-lineWidth/2,offsetY-lineWidth/2, lineWidth, lineWidth);
                canvasContext.putImageData(pxs, offsetX-lineWidth/2, offsetY-lineWidth/2);
            })
        }
    }

    addPoint(point,canvasContext,originContext){
        this.pointList.push(point)
        const {lineWidth} = this
        if(canvasContext && originContext){
            const [offsetX,offsetY]  = point
            let pxs = originContext.getImageData(offsetX-lineWidth/2,offsetY-lineWidth/2, lineWidth, lineWidth);
            canvasContext.putImageData(pxs, offsetX-lineWidth/2, offsetY-lineWidth/2);
        }
    }

    

}

export  {Pen,Eraser}
