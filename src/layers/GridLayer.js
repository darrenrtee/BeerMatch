var tileTypes = ["1.png","2.png","3.png","4.png","5.png","6.png"];
var tileArray = [];

class GridLayer extends cc.Layer{
    constructor(){
        super();
        
        this.selectedRow = -1
        this.selectedCol = -1
        this.score = 0;

        this.gameWidth = this.getContentSize().width;
        this.gameHeight = this.getContentSize().height;
        this.fieldSize = 8;
        this.tileSize = 100;
        this.time = 120;
        this.size = cc.winSize;
        this.xPosition = this.size.width/2 - this.tileSize*this.fieldSize/2;
        this.yPosition = this.size.height/2 - this.tileSize*this.fieldSize/2;
        this.portrait = new PortraitLayout();
        this.landscape = new LandscapeLayout();
        this.toMainScene = new ToMainScene();

        //Inner Layer
        this.gridContainer = cc.Layer.create();
        this.gridContainer.setPosition(this.xPosition,this.yPosition);
        this.addChild(this.gridContainer);

        //Components
        this.addComponent(new GameLayerResizer());
        this.addChild(this.portrait);
        this.addChild(this.landscape);

        //Methods
        this.initializeGrid();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
 
            onTouchBegan: this.touchBegin,
            onTouchEnded: this.touchEnd
        },this);
        
    }        

    update(dt){
        this.time -= dt;
        if(this.time <= 0){
            cc.eventManager.removeAllListeners();
            cc.director.runScene(new ResultScene(this.score));
        }
        else{
            this.dropTiles();
            this.checkRows();
            this.checkColumn();
            this.spawnTiles();
            this.updateUI();
        }
    }

    initializeGrid(){
        for(var i = 0; i < this.fieldSize; i ++){
            tileArray[i] = [];
            for(var j = 0;j < this.fieldSize; j ++){
                this.addTile(i,j);
            }
        }
    }

    addTile(row,col){
        
        var randomTile = Math.floor(Math.random()*6);
        var sprite = cc.Sprite.create("res/"+tileTypes[randomTile]);
       
        this.gridContainer.addChild(sprite,1);
        sprite.type = randomTile;
        sprite.setPosition(row*this.tileSize+this.tileSize/2,col*this.tileSize+this.tileSize/2);
        
        tileArray[row][col] =  sprite;
    }

    touchBegin(touch,event){
        var pickedRow = Math.floor((touch.getLocationX() - this._node.xPosition)/this._node.tileSize);
        var pickedCol = Math.floor((touch.getLocationY() - this._node.yPosition)/this._node.tileSize);
        
        this.selectedRow = pickedRow;
        this.selectedCol = pickedCol;
        
        return true;
    }

    touchEnd(touch,event){
        var pickedRow = Math.floor((touch.getLocationX() - this._node.xPosition)/this._node.tileSize);
        var pickedCol = Math.floor((touch.getLocationY() - this._node.yPosition)/this._node.tileSize);
        var validMove = false;

        if((pickedRow >= 0 && pickedRow <= this._node.fieldSize-1)&& (pickedCol >= 0 && pickedCol <= this._node.fieldSize-1) && (this.selectedRow >= 0 && this.selectedRow <= this._node.fieldSize-1) && (this.selectedCol >= 0 && this.selectedCol <= this._node.fieldSize-1)){
            if(Math.abs(pickedRow - this.selectedRow) + Math.abs(pickedCol - this.selectedCol) === 1)
                validMove = true;
        }

        if(validMove){
            this._node.gridContainer.removeChild(tileArray[pickedRow][pickedCol]);
            this._node.gridContainer.removeChild(tileArray[this.selectedRow][this.selectedCol]);
            
            var first = tileArray[pickedRow][pickedCol];
            var second = tileArray[this.selectedRow][this.selectedCol];

            this._node.gridContainer.addChild(first);
            this._node.gridContainer.addChild(second);

            first.setPosition(this.selectedRow*this._node.tileSize+this._node.tileSize/2,this.selectedCol*this._node.tileSize+this._node.tileSize/2);
            second.setPosition(pickedRow*this._node.tileSize+this._node.tileSize/2,pickedCol*this._node.tileSize+this._node.tileSize/2);

            tileArray[pickedRow][pickedCol] = second;
            tileArray[this.selectedRow][this.selectedCol] = first;
        }
    }

    checkRows(){
        for(var j = 0; j < this.fieldSize; j ++){
            for(var i = 0; i < this.fieldSize - 2; i ++){
                var type1 = null;
                var type2 = null;
                var type3 = null;

                if(tileArray[i][j] != null)
                    type1 = tileArray[i][j].type;
                
                if(tileArray[i+1][j] != null)
                    type2 = tileArray[i+1][j].type;
                
                if(tileArray[i+2][j] != null)
                    type3 = tileArray[i+2][j].type;
                
                if(type1 === type2 && type1 === type3 && type1 !== null){
                    this.gridContainer.removeChild(tileArray[i][j]);
                    this.gridContainer.removeChild(tileArray[i+1][j]);
                    this.gridContainer.removeChild(tileArray[i+2][j]);
                    tileArray[i][j] = null;
                    tileArray[i+1][j] = null;
                    tileArray[i+2][j] = null;
                    this.score += 3;
                }
            }
        }
    }

    checkColumn(){
        for(var i = 0; i < this.fieldSize; i ++){
            for(var j = 0;j < this.fieldSize-2; j ++){
                var type1 = null;
                var type2 = null;
                var type3 = null;

                if(tileArray[i][j] != null)
                    type1 = tileArray[i][j].type;
                
                if(tileArray[i][j+1] != null)
                    type2 = tileArray[i][j+1].type;
                
                if(tileArray[i][j+2] != null)
                    type3 = tileArray[i][j+2].type;

                if(type1 === type2 && type1 === type3 && type1 !== null){
                    this.gridContainer.removeChild(tileArray[i][j]);
                    this.gridContainer.removeChild(tileArray[i][j+1]);
                    this.gridContainer.removeChild(tileArray[i][j+2]);
                    tileArray[i][j] = null;
                    tileArray[i][j+1] = null;
                    tileArray[i][j+2] = null;
                    this.score += 3;
                }
            }
        }
    }

    dropTiles(){
        for(var i = this.fieldSize-1; i > 0; i --){
            for(var j = 0;j < this.fieldSize; j ++){
                if(tileArray[j][i-1] == null){
                    
                        if(tileArray[j][i] != null){
                            var type = tileArray[j][i].type;
                            var sprite = cc.Sprite.create("res/"+tileTypes[type]);
                        
                            this.gridContainer.removeChild(tileArray[j][i]);
                        
                            this.gridContainer.addChild(sprite,1);
                            sprite.type = type;
                            sprite.setPosition(j*this.tileSize+this.tileSize/2,(i-1)*this.tileSize+this.tileSize/2);
                            
                            tileArray[j][i] = null;
                            tileArray[j][i-1] =  sprite;
                        }
                }
            }
        }  
    }

    spawnTiles(){
        for(var j = 0; j < this.fieldSize; j++){
            if(tileArray[j][this.fieldSize-1] == null){
                var randomTile = Math.floor(Math.random()*6);
                var sprite = cc.Sprite.create("res/"+tileTypes[randomTile]);
            
                this.gridContainer.addChild(sprite,1);
                sprite.type = randomTile;
                sprite.setPosition(j*this.tileSize+this.tileSize/2,(this.fieldSize-1)*this.tileSize+this.tileSize/2);
                
                tileArray[j][this.fieldSize-1] =  sprite;
            }
        }
    }

    updateUI(){
        this.landscape.points = this.score;
        this.portrait.points = this.score;
        this.landscape.time = Math.round(this.time);
        this.portrait.time = Math.round(this.time);
    }
}
