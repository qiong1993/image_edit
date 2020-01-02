import './index.scss'

const defaultOptions = {
    el:'image_container'
}


class ImageEdit {

    constructor(param={}){
        this.options = {...defaultOptions,...param}
        this.init()
    }
    
    init() {
        const rootElement = $('#'+this.el);
        if(!rootElement){
            const rootElement = document.createElement('div')
            rootElement.setAttribute('id',this.el)
            $(body).append(rootElement)
        }    

    }
}

export default ImageEdit