class Ball extends cc.DrawNode{

    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    onEnter(){
        super.onEnter();
        let size = this.getParent().getContentSize();
        this.drawDot(cc.p(0,0), 10, cc.color(255,255,255,255));
        this.x = size.width/2;
        this.y = size.height/2 + 100;
    }
}