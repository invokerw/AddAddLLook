/**
 * Created by lmy on 2016/9/5.
 */


var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var bg = new GameBGLayer();
        this.addChild(bg);

        var touch = new GameTouchLayer();
        this.addChild(touch);
    }
})