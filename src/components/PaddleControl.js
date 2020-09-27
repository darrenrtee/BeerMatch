class PaddleControl extends cc.Component{
    onEnter(){
        super.onEnter();
        
        this.listener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: this.onKeyPressed,
                onKeyReleased: this.onKeyReleased
        });
        cc.eventManager.addListener(this.listener, 
            this.getOwner());
        
    }

    onKeyPressed(key, event){
        if(key == 39)
            event.getCurrentTarget().paddlePos = 500;
         
       if(key == 37)
            event.getCurrentTarget().paddlePos = -500;
    }

    onKeyReleased(key, event){
        if(key == 39){
             event.getCurrentTarget().paddlePos = 0;
        }
        if(key == 37){
             event.getCurrentTarget().paddlePos = 0;
        }
     }

}