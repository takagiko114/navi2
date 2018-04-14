// This is a JavaScript file
//時・分・秒を取得する---debug用
function getTime(){
    var jikan= new Date();
    var hour = jikan.getHours();
    var minute = jikan.getMinutes();
    var second = jikan.getSeconds();
    var logtime = hour+":" + minute + ":" + second;
    return logtime;
}
