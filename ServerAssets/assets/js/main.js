function openArcade() {
    //document.body.addEventListener('click',fullscreen)
    controls();
    resize()
}

function crtEffect(){
    var canvas = document.getElementById('canvas')
    var ctx=canvas.getContext("2d");
    var grd=ctx.createRadialGradient(canvas.width/2,canvas.height/2,Math.max(canvas.width,canvas.height)*0.7/2,canvas.width/2,canvas.height/2,Math.max(canvas.width,canvas.height)*1.2/2);
    grd.addColorStop(0,"#3a5164");
    grd.addColorStop(1,"#22303b");   
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height); 
}

function resize(){
    var canvas = document.getElementById('canvas')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight  
    crtEffect()     
}

function fullscreen(){
    var canvas = document.getElementById('canvas')
    if(canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen()
    }
   else {
        canvas.mozRequestFullScreen()
   }  
   setTimeout(resize,100)          
}

function runTestGame(){
    if (typeof startGame === "function") { 
        // safe to use the function
        startGame()
    } else {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = '/games/squids.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); 
    } 
    setTimeout(function(){
        if (typeof startGame === "function") { 
            // safe to use the function
            startGame()
            clearInterval()
        }
    },100)
}

function controls(){
    document.onkeydown = function(e) {
        e = e || window.event
        if (e.keyCode == 32) { //spacebar
            fullscreen()
        }
        if (e.keyCode == 65) { //a
            runTestGame()
        }
    } 
}
