class ResultScene extends cc.Scene{    
    constructor(score){
        super();
        this.displayResult(score)
    }

    displayResult(score){
        let resultLayer = new ResultLayer(score);
        this.addChild(resultLayer);
    }
}