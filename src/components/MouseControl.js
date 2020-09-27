class MouseControl extends cc.Component{
    onEnter(){
        this.owner =  this.getOwner()
        super.onEnter();
        this.listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.move
        });
        
        cc.eventManager.addListener(this.listener, 
            this.owner);

    }

    move(event){
       cc.log("etu");
    }
}