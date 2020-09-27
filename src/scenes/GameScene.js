class GameScene extends cc.Scene{    
    constructor(){
        super();
    }
    onEnter(){
        super.onEnter();

        let gridLayer = new GridLayer();
        this.addChild(gridLayer);
    }
}