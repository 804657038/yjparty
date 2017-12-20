var scroll = document.querySelector('mains');
var outerScroller = document.querySelector('wrap');
var touchStart = 0;
var touchDis = 0;
outerScroller.addEventListener('touchstart', function(event) {
    var touch = event.targetTouches[0];
    // 把元素放在手指所在的位置
    touchStart = touch.pageY;

}, false);
outerScroller.addEventListener('touchmove', function(event) {
    var touch = event.targetTouches[0];

    scroll.style.top = scroll.offsetTop + touch.pageY-touchStart + 'px';

    touchStart = touch.pageY;
    touchDis = touch.pageY-touchStart;
}, false);
outerScroller.addEventListener('touchend', function(event) {
    touchStart = 0;
    var top = scroll.offsetTop;

    if(top>70)refresh();
    if(top>0){
        var time = setInterval(function(){
            scroll.style.top = scroll.offsetTop -2+'px';
            if(scroll.offsetTop<=0)clearInterval(time);
        },1)
    }
}, false);
function refresh(){
  window.location.href='index.html';
}