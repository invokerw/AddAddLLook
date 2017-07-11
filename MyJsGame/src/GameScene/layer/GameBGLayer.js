/**
 * Created by lmy on 2016/9/5.
 */

var GameBGLayer = cc.Layer.extend({
    bg:null,
    figure:null,
    ctor:function(){
        this._super();
        this.initbg();

    },
    //设置背景
    initbg:function(){
        this.bg = new cc.Sprite(res.startbg);
        this.bg.setPosition(GC.w_2,GC.h_2);
        this.addChild(this.bg);
    },

})