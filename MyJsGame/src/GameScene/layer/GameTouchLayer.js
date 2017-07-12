/**
 * Created by lmy on 2016/9/5.
 */

var GameTouchLayer = cc.Layer.extend({
    ctor:function(){

        this._super();
        this.init();
        this.initfiguresprite();
        this.score();
        this.spbar();
        this.musicicon();
        this.goback();
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan,
            onTouchEnded:this.onTouchEnded,

        },this);
        this.schedule(this.godown,0.05);
    },
    goback:function(){
        this.backItem = new cc.MenuItemFont("Back",this.Back,res.futura);
        this.backItem.setColor(cc.color('#EE9D26'));
        var menu = new cc.Menu(this.backItem);
        menu.setScale(1.5);
        menu.setPosition(250,GC.h+180);
        this.addChild(menu,10);
    },
    musicicon:function(){
        var MusicBtnNormal = new cc.Sprite(res.musicicon, cc.rect(0, 0, 42,
            42));
        var MusicBtnSelect = new cc.Sprite(res.musicicon, cc.rect(42, 0, 42,
            42));
        var MusicBtnDisable = new cc.Sprite(res.musicicon, cc.rect(84, 0, 42,
            42));
        var musicSprite = new cc.MenuItemSprite(
            MusicBtnNormal,
            MusicBtnSelect,
            MusicBtnDisable,
            this.musicpause,
            this
        )
        var MusicMenu = new cc.Menu(musicSprite);
        MusicMenu.setPosition(GC.w-100,GC.h-100);
        this.addChild(MusicMenu);

    },
    musicpause:function(){
        if(GC.CONTAINS.play==1){
            cc.audioEngine.stopMusic(res.bgmusic1);
            GC.CONTAINS.play = 0;
        }
        else if(GC.CONTAINS.play==0){
            cc.audioEngine.playMusic(res.bgmusic1,true);
            GC.CONTAINS.play = 1;
        }

    },
    initfiguresprite:function(){
        this.Figure = new FigureSprite(GC.CONTAINS.Level);
        this.addChild(this.Figure);
    },
    init:function(){
        GC.CONTAINS.SUM = [];
        this.mytagnamearr = [];
        this.ss = 0;
        this.progress = 100;

        cc.audioEngine.playMusic(res.bgmusic1,true);
    },
    //获取点击到的值并存入数组
    onTouchBegan:function(touch,event){

        var target = event.getCurrentTarget();
        if(target.progress==0){
            return false;
        }


        //获取点击到的精灵
        if(touch.getLocation().x>29&&touch.getLocation().x<617&&touch.getLocation().y>224&&touch.getLocation().y<822) {
            target.i = Math.round((touch.getLocation().y - 250) / 78);
            target.j = Math.round((touch.getLocation().x - 45) / 78);
            if (GC.CONTAINS.FIGURE[target.i][target.j] == 0) {
                return false;
            }

            var mytagname = target.i.toString() + target.j.toString();
            target.mytagnamearr.push(mytagname);
            target.myFigure = target.Figure.getChildByTag(mytagname);

            //点击到的精灵动画
            var figuresmall = cc.scaleTo(0.5,0.5);
            var figureabig = cc.scaleTo(1.5,1.5);
            target.figureaction = cc.repeatForever(cc.sequence(figuresmall,figureabig));
            target.figureaction.setTag("figure");
            target.myFigure.runAction(target.figureaction);
        }
        else{
            return false;
        }
        return true;
    },
    onTouchEnded:function(touch,event){
        var target = event.getCurrentTarget();
        target.mysum = 0;
        target.num = 0;


        //对选中的数字加和判断
        if(touch.getLocation().x>29&&touch.getLocation().x<617&&touch.getLocation().y>224&&touch.getLocation().y<822){

            GC.CONTAINS.SUM.push(GC.CONTAINS.FIGURE[target.i][target.j]);

            for(var n=0;n<GC.CONTAINS.SUM.length;n++){
                target.mysum += GC.CONTAINS.SUM[n];
            }

            //判断计算成功
            if(target.mysum==GC.CONTAINS.MYSUM){

                GC.CONTAINS.FIGURE[target.i][target.j] = 0;
                for(var m=target.mytagnamearr.length-1;m>=0;m--){
                    var arri = parseInt(parseInt(target.mytagnamearr[m])/10);
                    var arrj = parseInt(target.mytagnamearr[m])%10;
                    GC.CONTAINS.FIGURE[arri][arrj] = 0;
                    var curY = target.Figure.getChildByTag(target.mytagnamearr[m]).getPositionY();
                    target.Figure.getChildByTag(target.mytagnamearr[m]).stopActionByTag("figure");
                    target.Figure.getChildByTag(target.mytagnamearr[m]).removeFromParent();

                    while(arri<7){
                        if(GC.CONTAINS.FIGURE[arri+1][arrj]!=0){
                            var newname = (arri+1).toString()+arrj.toString();
                            target.Figure.getChildByTag(newname).setPositionY(curY);

                            curY = curY+78;

                            //对交换位置的数组值交换
                            var y = GC.CONTAINS.FIGURE[arri][arrj];
                            GC.CONTAINS.FIGURE[arri][arrj] = GC.CONTAINS.FIGURE[arri+1][arrj];
                            GC.CONTAINS.FIGURE[arri+1][arrj] = y;

                            //改变tagname


                            target.Figure.getChildByTag(newname).setTag((arri).toString()+arrj.toString());
                            for(var h=m;h>=0;h--){
                                if((arri+1).toString()+arrj.toString()==target.mytagnamearr[h]){
                                    target.mytagnamearr[h] = (arri).toString()+arrj.toString();
                                    break;
                                }
                            }
                        }
                        arri = arri +1;
                    }
                    target.mytagnamearr.del(m);

                }

                for(var x=GC.CONTAINS.SUM.length-1;x>=0;x--){
                    GC.CONTAINS.SUM.del(x);
                }

                target.ss += 10;
                target.progress = 100;
                target.Figure.scorelabel.removeFromParent();

                cc.audioEngine.playEffect(res.rightmusic);


                //所有数字都选完
                for(var i=0;i<8;i++){
                    for(var j=0;j<8;j++){
                        if(GC.CONTAINS.FIGURE[i][j]==0){
                            target.num+=1;

                        }
                    }
                }
                if(target.num==64){
                    target.Figure.removeFromParent();
                    target.Figure = new FigureSprite(GC.CONTAINS.Level);
                    target.addChild(target.Figure);
                 /*   cc.audioEngine.playMusic(res.bgmusic1,true);*/
                    return false;
                }
                target.myscore.removeFromParent();
                target.score();
                target.Figure.sum();
            }
            //计算错误
            else if(target.mysum>GC.CONTAINS.MYSUM){
                var shake = cc.sequence(cc.moveBy(0.05,cc.p(10,10)),
                    cc.moveBy(0.1,cc.p(-10,-10)),
                    cc.moveBy(0.1,cc.p(10,10)),
                    cc.moveBy(0.1,cc.p(-10,-10)));
                target.runAction(shake);
                for(var q=target.mytagnamearr.length-1;q>=0;q--){
                    target.Figure.getChildByTag(target.mytagnamearr[q]).stopActionByTag("figure");
                    var figurenormal = cc.scaleTo(0.1,1.5,1.5);
                    target.Figure.getChildByTag(target.mytagnamearr[q]).runAction(figurenormal);
                    target.mytagnamearr.del(q);
                }
                for(var y=GC.CONTAINS.SUM.length-1;y>=0;y--){
                    GC.CONTAINS.SUM.del(y);
                }
                cc.audioEngine.playEffect(res.wrongmusic);
            }
        }

        return true;
    },
    destory:function(){
        this.removeFromParent();
    },
    spbar:function(){
        this.barbg = new cc.Sprite(res.barbg);
        this.barbg.setPosition(500,GC.h-200);
        this.addChild(this.barbg);

        this.mybar = new ccui.LoadingBar(res.bar);
        this.mybar.setPosition(500,GC.h-200);
        this.addChild(this.mybar);
        this.mybar.setPercent(100);
    },
    godown:function(){
        this.mybar.setPercent(this.progress);
        this.progress--;
        if(this.progress==0){
            this.unschedule(this.godown);
            cc.audioEngine.playEffect(res.failmusic);
            this.oversp = new cc.Sprite(res.gameover);
            this.oversp.setPosition(GC.w_2,GC.h+this.oversp.getContentSize().height/2);
            this.addChild(this.oversp);
            //显示最终得分
            var finalscore = new cc.LabelBMFont("Score:"+this.ss,res.futura);
            finalscore.setPosition(this.oversp.getContentSize().width/2,this.oversp.getContentSize().height/2-50);
            this.oversp.addChild(finalscore);

            //返回按钮

            var BackBtnNormal = new cc.Sprite(res.menu, cc.rect(0, 0, 152,
                60));
            var BackBtnSelect = new cc.Sprite(res.menu, cc.rect(152, 0, 152,
                60));
            var BackBtnDisable = new cc.Sprite(res.menu, cc.rect(304, 0, 152,
                60));
            var backSprite = new cc.MenuItemSprite(
                BackBtnNormal,
                BackBtnSelect,
                BackBtnDisable,
                this.Back,
                this
            )

            //重玩按钮
            var AgainBtnNormal = new cc.Sprite(res.menu, cc.rect(0, 60, 152,
                60));
            var AgainBtnSelect = new cc.Sprite(res.menu, cc.rect(152, 60, 152,
                60));
            var AgainBtnDisable = new cc.Sprite(res.menu, cc.rect(304, 60, 152,
                60));
            var againSprite = new cc.MenuItemSprite(
                AgainBtnNormal,
                AgainBtnSelect,
                AgainBtnDisable,
                this.Again,
                this
            )
            var backmenu = new cc.Menu(backSprite,againSprite);
            backmenu.alignItemsHorizontallyWithPadding(10);
            backmenu.setPosition(this.oversp.getContentSize().width/2,this.oversp.getContentSize().height/2-150);
            this.oversp.addChild(backmenu);
            var overmove = cc.moveTo(1,GC.w_2,GC.h_2).easing(cc.easeBackInOut());
            this.oversp.runAction(overmove);


            for(var x =0;x<GC.CONTAINS.FigureSprite.length;x++){
                GC.CONTAINS.FigureSprite[x].stopAllActions();
            }
        }
    },
    Again:function(){
        this.init();
       /* cc.audioEngine.playMusic(res.bgmusic,true);*/
        if(GC.CONTAINS.t==1){
            cc.audioEngine.playMusic(res.bgmusic,true);
            GC.CONTAINS.t=0;
        } else if(GC.CONTAINS.t==0){
           /* cc.audioEngine.playMusic(res.bgmusic1,true);*/
            GC.CONTAINS.t=1;
        }


        this.Figure.removeFromParent();
        this.oversp.removeFromParent();
        this.Figure = new FigureSprite(GC.CONTAINS.Level);
        this.addChild(this.Figure);
        this.myscore.removeFromParent();
        this.score();

        this.barbg.removeFromParent();
        this.mybar.removeFromParent();
        this.spbar();
        //哈哈哈哈这里就是万恶的操纵【倒计时】的地方。。
        this.schedule(this.godown,0.1);
    },
    Back:function(){

        cc.director.runScene(new IndexScene());

    },
    score:function(){
        this.myscore = new cc.LabelBMFont("Score:"+this.ss,res.futura);
        this.myscore.setPosition(GC.w_2,GC.h-100);
        this.addChild(this.myscore);

    }
})