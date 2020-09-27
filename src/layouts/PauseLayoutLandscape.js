class PauseLayoutLandscape extends ccui.RelativeBox{
    constructor(){
        super(cc.winSize);
    }

    onEnter(){
        super.onEnter();

        this.createButton();

        this.scheduleUpdate();
        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
    }
    

    createButton(){
        let button = new ccui.Button( res.Button9Slice_png, res.Button9SliceSelected_png);

        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(90,50));

        button.setTitleFontSize(20)
        button.setTitleFontName("Pixel")
        button.setTitleText("Pause")

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_RIGHT);
        layoutParameter.setMargin(0,0,0,20);
        button.setLayoutParameter(layoutParameter);

        button.addClickEventListener(this.onClick.bind(this))
        this.addChild(button);
    }

    createPausePopup(){
        let button = new ccui.Button( res.Button9Slice_png, res.Button9SliceSelected_png);

        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(200,200));

        button.setTitleFontSize(20)
        button.setTitleFontName("Pixel")
        button.setTitleText("Resume")

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
        layoutParameter.setMargin(0,0,0,20);
        button.setLayoutParameter(layoutParameter);

        button.addClickEventListener(this.onClickResume.bind(this))
        this.addChild(button);
    }

    onClick(){
        this.createPausePopup();
        this.getParent().pause();
    }

    onClickResume(){
        this.getParent().resumeGame();
        this.allChildren = this.getChildren();
        this.removeChild(this.allChildren[1]);
    }
}