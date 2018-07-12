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
    //crtEffect()
    loadGames()   
    crtEffect()  
}

function loadGames(){
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
    base_image = new Image();
    base_image.src = 'games/squids/assets/cartridge.png';
    base_image.onload = function(){
        base_image.width
        var scaler = (base_image.height/canvas.height)/0.25
        var n = 5
        for (i = 0; i < n; i++){
            context.drawImage(base_image, (canvas.width-base_image.width/scaler/2)*1/(n+2)*(i+1), canvas.height*0.5+(canvas.height*0.3-base_image.height/scaler)/(n+2)*i,base_image.width/scaler,base_image.height/scaler);
        }
    }
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
        po.src = '/games/squids/squids.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); 
    } 
    setTimeout(function(){
        if (typeof startGame === "function") { 
            // safe to use the function
            startGame()
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
