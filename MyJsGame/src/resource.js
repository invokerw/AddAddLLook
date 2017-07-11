var res = {
    HelloWorld_png : "res/HelloWorld.png",
    //¿ªÊ¼³¡¾°
    //±³¾°
    startbg:"res/img/fondo1.png",
    //±³¾°ÔÆ
    bgcloud:"res/img/nube1.png",
    //logo
    logo:"res/img/normal_mode.png",
    //×ÖÌå
    futura : "res/font/futura-48.fnt",

    //Êý×Ö¿é
    figure:"res/img/bricks.png",

    //ÑªÌõ
    barbg:"res/img/time.png",
    bar:"res/img/time_progress.png",

    //gameover
    gameover:"res/img/gameover.png",

    //menu
    menu:"res/img/botones.png",

    bgmusic:"res/sound/music.mp3",
    bgmusic1:"res/sound/music1.mp3",


    rightmusic:"res/sound/11.mp3",
    wrongmusic:"res/sound/suma_mal.mp3",
    againmusic:"res/sound/mostrarpanel.mp3",
    failmusic:"res/sound/01.mp3",
    musicicon:"res/img/sound.png",

};

var g_resources = [

];
for (var i in res) {
    g_resources.push(res[i]);
}

Array.prototype.del = function(index){
    this.splice(index,1);
}
