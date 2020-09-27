class Paddle extends cc.DrawNode{

    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    onEnter(){
        super.onEnter();
        let size = this.getParent().getContentSize();
        this.drawRect(cc.p(0,0), cc.p(this.width, this.height), cc.color(255,255,255,255));
        this.x = size.width/2 - this.width/2;
        this.y = 0;
    }
}