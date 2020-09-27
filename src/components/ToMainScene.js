class ToMainScene extends cc.Component{
    onEnter(){
        super.onEnter();
        this.listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                cc.log(event.getCurrentTarget());
            }
        });
        cc.eventManager.addListener(this.listener, 
            this.getOwner());
    }

    goToMainScene(){
        cc.director.runScene(new GameScene());
    }

}