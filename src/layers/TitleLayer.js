class TitleLayer extends cc.Layer{
    
    constructor(){
        super();
        
        var start = function(){
            toMainScene.goToMainScene();
        }
        
        let size = cc.winSize;
        let toMainScene = new ToMainScene();
        let titleLabel = new cc.LabelTTF("BEER MATCH", 'Pixel', 120);
        var sprite = new cc.Sprite.create(res.Background_png);
        var menuItem1 = new cc.MenuItemImage.create(res.StartButton_png,res.StartButton_png, start);
        var menu = new cc.Menu(menuItem1);
        
        titleLabel.setPosition(cc.p(size.width /2, (size.height /6) * 5));
        sprite.setPosition(cc.p(size.width/2,size.height/2))
        sprite.setScale(0.5);
        menuItem1.setPosition(cc.p(size.width /2, (size.height /4) * 1));
        menu.setPosition(cc.p(0,0));
        this.addChild(sprite,0);
        this.addChild(titleLabel,1);
        this.addChild(menu,1);
        this.addComponent(new GameLayerResizer());
    }
}