class ResultLayer extends cc.Layer{
    constructor(score){
        super();

        var restart = function(){
            toMainScene.goToMainScene();
        }

        let size = cc.winSize;
        let toMainScene = new ToMainScene()
        let titleLabel = new ccui.Text("Game OVER", 'Pixel', 64);
        titleLabel.addComponent(new FitToParent())
        let scoreLabel = new ccui.Text("FINAL SCORE: " + score, 'Pixel', 64);
        scoreLabel.addComponent(new FitToParent())

        titleLabel.setPosition(cc.p(size.width /2, (size.height /6) * 5));
        scoreLabel.setPosition(cc.p(size.width /2, (size.height /6) * 4));

        var menuItem1 = new cc.MenuItemImage.create(res.PlayAgainButton_png,res.PlayAgainButton_png, restart);
        var menu = new cc.Menu(menuItem1);
        
        menuItem1.setPosition(cc.p(size.width /2, (size.height /4) * 1));
        menu.setPosition(cc.p(0,0));
        
        this.addChild(titleLabel,1);
        this.addChild(scoreLabel,1);
        this.addChild(menu,1);
        this.addComponent(new GameLayerResizer());
    }
}