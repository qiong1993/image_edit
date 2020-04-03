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

class Pen extends Shape{
    constructor(props){
        super(props)
    }
    draw(canvasContext){
        canvasContext.globalCompositeOperation = "source-over"
        super.draw(canvasContext)
    }
}

class Eraser extends Shape{
    draw(canvasContext){
        canvasContext.globalCompositeOperation = "destination-out"
        super.draw(canvasContext)
    }
    // draw(canvasContext){
    //     const {lineWidth,startPos} = this
    //     canvasContext.lineCap = "round";　　//设置线条两端为圆弧
    //     canvasContext.lineJoin = "round";　　//设置线条转折为圆弧
    //     canvasContext.lineWidth = lineWidth;　　
    //     canvasContext.globalCompositeOperation = "destination-out";

    //     canvasContext.save();
    //     canvasContext.beginPath()
    //     canvasContext.arc(...startPos,lineWidth/2,0,2*Math.PI);
    //     canvasContext.fill();
    //     canvasContext.restore();
    // }

    // addPoint(point,canvasContext){
    //     this.pointList.push(point)
    //     if(canvasContext){
    //         canvasContext.save()
    //         canvasContext.lineTo(...point) //鼠标点下去的位置
    //         canvasContext.stroke()
    //         canvasContext.restore();
    //     }
    // }

    

}

export  {Pen,Eraser}
