import './index.scss'

const defaultOptions = {
    el:'image_container'
}

class ImageEdit {

    constructor(param={}){
        this.options = {...defaultOptions,...param}
        this.init()
    }
    
    init(a, b) {
        const rootElement = $('#'+this.el);
        if(!rootElement){
            
        }
    }
}

export default ImageEdit