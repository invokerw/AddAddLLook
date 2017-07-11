/**
 * Created by lmy on 2016/9/5.
 */

var IndexScene = cc.Scene.extend({
   onEnter: function () {
       this._super();
       var indexbglayer = new IndexbgLayer();
       this.addChild(indexbglayer);

       var indextouch = new IndexTouchLayer();
       this.addChild(indextouch);
   }
});