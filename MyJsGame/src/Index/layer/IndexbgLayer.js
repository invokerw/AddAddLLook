/**
 * Created by lmy on 2016/9/5.
 */


var IndexbgLayer = cc.Layer.extend({
    bg:null,
    logo:null,
   ctor:function(){
       this._super();
       this.initmusic();
       this.initbg();
       this.initlogo();
       this.initarray();
       this.schedule(this.addcloud,2);
   },
    //添加背景云
    addcloud:function() {
        this.newcloud = new CloudSprite();
        this.addChild(this.newcloud,0);
    },
    //初始化数组
    initarray:function(){
        GC.CONTAINS.ClOUD = [];
        GC.CONTAINS.play = 1;
    },
    //添加背景图片
    initbg:function(){
        this.bg = new cc.Sprite(res.startbg);
    /*    this.bg.setScaleX(1.5);
        this.bg.setScaleY(1.1);*/
        this.bg.setPosition(GC.w_2,GC.h_2);
        this.addChild(this.bg);
    },
    //添加logo图片
    initlogo:function(){
        this.logo = new cc.Sprite(res.logo,cc.rect(0,0,135,120));
        this.logo.setScale(3);
        this.logo.setPosition(GC.w_2,GC.h+this.logo.getContentSize().height/2);
        this.addChild(this.logo,1);
        var moveTo = cc.moveTo(1,GC.w_2,GC.h/2+200).easing(cc.easeBackOut());
        this.logo.runAction(moveTo);
    },
    //设置背景音乐
    initmusic:function(){
    if(GC.CONTAINS.play==1){
        cc.audioEngine.playMusic(res.bgmusic,true);
    }
 }
})