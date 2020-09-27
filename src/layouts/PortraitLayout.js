class PortraitLayout extends ccui.RelativeBox{
    constructor(){
        super(cc.winSize);
        this.points = 0;
        this.scheduleUpdate();
        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnPortrait());
    }
    onEnter(){
        super.onEnter();
        let score = new ccui.Text("Score: " + this.points, "Pixel", 20);
        let timeLeft = new ccui.Text("Time Left : " + this.time + " Seconds", "Pixel", 20);
        
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
        score.setLayoutParameter(layoutParameter);
        
        let layoutParameter1 = new ccui.RelativeLayoutParameter();
        layoutParameter1.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_RIGHT);
        timeLeft.setLayoutParameter(layoutParameter1);
        
        this.addChild(score);
        this.addChild(timeLeft);
    }

    update(){
        super.update();
        this.allChildren = this.getChildren();
        this.removeChild(this.allChildren[0]);
        this.removeChild(this.allChildren[1]);

        let score = new ccui.Text("Score: " + this.points, "Pixel", 24);
        let timeLeft = new ccui.Text("Time Left : " + this.time + " Seconds", "Pixel", 24);
        
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        score.setLayoutParameter(layoutParameter);

        
        let layoutParameter1 = new ccui.RelativeLayoutParameter();
        layoutParameter1.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
        timeLeft.setLayoutParameter(layoutParameter1);
        
        this.addChild(score);
        this.addChild(timeLeft);
    }
}