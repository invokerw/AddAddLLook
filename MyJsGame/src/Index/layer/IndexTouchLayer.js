/**
 * Created by lmy on 2016/9/5.
 */

var IndexTouchLayer = cc.Layer.extend({
    newcloud:null,
    logo:null,
    ctor:function(){
        this._super();

        this.initlabel();
        this.initstart();
        this.initlevel();

    },
    //title
    initlabel:function(){
        this.startlabel = new cc.LabelBMFont("Add It Up",res.futura);
        this.startlabel.setPosition(GC.w_2,GC.h-100);
        this.addChild(this.startlabel,1);
    },
    //start menu
    initstart:function(){
        this.startItem = new cc.MenuItemFont("Start",this.onStart,this);
        this.startItem.setColor(cc.color(255,0,0));
        var menu = new cc.Menu(this.startItem);
        menu.setScale(2);
        menu.setPosition(GC.w_2*2,GC.h_2+300);
        this.addChild(menu,2);
    },
    //level menu
    initlevel:function(){
        var EasyBtnNormal = new cc.Sprite(res.menu, cc.rect(0, 120, 152,
            60));
        var EasyBtnSelect = new cc.Sprite(res.menu, cc.rect(152, 120, 152,
            60));
        var EasyBtnDisable = new cc.Sprite(res.menu, cc.rect(304, 120, 152,
            60));
        var EasySprite = new cc.MenuItemSprite(
            EasyBtnNormal,
            EasyBtnSelect,
            EasyBtnDisable,
            this.easy,
            this
        )

        var HardBtnNormal = new cc.Sprite(res.menu, cc.rect(0, 180, 152,
            60));
        var HardBtnSelect = new cc.Sprite(res.menu, cc.rect(152, 180, 152,
            60));
        var HardBtnDisable = new cc.Sprite(res.menu, cc.rect(304, 180, 152,
            60));
        var HardSprite = new cc.MenuItemSprite(
            HardBtnNormal,
            HardBtnSelect,
            HardBtnDisable,
            this.hard,
            this
        )

        var LevelMenu = new cc.Menu(EasySprite,HardSprite);
        LevelMenu.alignItemsHorizontallyWithPadding(10);
        LevelMenu.setPosition(GC.w_2,GC.h_2-100);
        this.addChild(LevelMenu);
    },
    easy:function(){
        GC.CONTAINS.Level = 0;
    },
    hard:function(){
        GC.CONTAINS.Level = 1;
    },
    onStart:function(){
        cc.director.runScene(new GameScene());
    }

})