/**
 * Created by lmy on 2016/9/7.
 */

var FigureSprite = cc.Sprite.extend({
    figure:null,
    ctor:function(level){
        this._super();
        this.levle = level;
        this.initsprite();
        this.initfigure();
        this.sum();
    },
    initsprite:function(){
        GC.CONTAINS.FigureSprite = [];
        GC.CONTAINS.FIGURE = [];
    },
    //设置游戏数字
    initfigure: function () {

        for(var i=0;i<8;i++){
            GC.CONTAINS.FIGURE[i] = [];
            for(var j=0;j<8;j++){
                var row = parseInt(Math.random()*9)+1;
                var col = parseInt(Math.random()*9);
                this.figure = new cc.Sprite(res.figure,cc.rect(row*52,col*52,52,52));
                this.figure.setPosition(GC.w_2+ this.figure.getContentSize().width,GC.h_2);
                this.figure.setScale(1.5);
                /*GC.CONTAINS.FigureSprite[i][j] = this.figure;*/
                var tagname = i.toString()+ j.toString();
                this.figure.setTag(tagname);  //设置数字精灵的tag 以便touch层获取
                GC.CONTAINS.FigureSprite.push(this.figure);
                this.addChild(this.figure);
                var moveTo = cc.moveTo(1,45+j*78,250+i*78).easing(cc.easeBackOut());  //设置数字出现的动画
                this.figure.runAction(moveTo);
                GC.CONTAINS.FIGURE[i][j] = row;

            }
        }
    },
    //显示要实现的加和
    sum:function(){
        this.showsum();
        while(GC.CONTAINS.MYSUM == 0){
            this.showsum();
        }
        this.scorelabel = new cc.LabelBMFont("Sum:"+GC.CONTAINS.MYSUM,res.futura);
        this.scorelabel.setPosition(80,GC.h-200);
        this.addChild(this.scorelabel);

    },
    showsum:function(){
        var row1 = parseInt(Math.random()*8);
        var col1 = parseInt(Math.random()*8);
        var row2 = parseInt(Math.random()*8);
        var col2 = parseInt(Math.random()*8);
        var row3 = parseInt(Math.random()*8);
        var col3 = parseInt(Math.random()*8);
        switch (this.levle){
            case 0:
                GC.CONTAINS.MYSUM = GC.CONTAINS.FIGURE[row1][col1]+GC.CONTAINS.FIGURE[row2][col2];
                break;
            case 1:
                GC.CONTAINS.MYSUM = GC.CONTAINS.FIGURE[row1][col1]+GC.CONTAINS.FIGURE[row2][col2]+GC.CONTAINS.FIGURE[row3][col3];
                break;
        }


    },
})