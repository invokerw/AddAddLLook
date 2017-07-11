/**
 * Created by lmy on 2016/9/5.
 */


var CloudSprite = cc.Sprite.extend({
    cloud:null,
    ctor: function () {
        this._super();
        this.initcloud();
        this.schedule(this.cloudmove,0.1);
    },
   initcloud:function(){
        this.cloud = new cc.Sprite(res.bgcloud);
        this.cloud.setPosition(-this.cloud.getContentSize().width/2,parseInt(Math.random()*1000));
        this.addChild(this.cloud);
         GC.CONTAINS.ClOUD.push(this.cloud);
    },
    cloudmove:function(){
        this.cloud.x += 20;
        if(this.cloud.x>GC.w){
            this.cloud.removeFromParent();
        }
        for(var i=0;i<GC.CONTAINS.FIGURE.length;i++){
            if(GC.CONTAINS.FIGURE[i].x>GC.w){
                GC.CONTAINS.FIGURE.del(i);
            }
        }
    }
})