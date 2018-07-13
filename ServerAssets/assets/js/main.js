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
    base_image.src = 'games/tennis/assets/cartridge.png';
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
        po.src = '/games/tennis/main.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); 
    } 
    setTimeout(function(){
        if (typeof startGame === "function") { 
            // safe to use the function
            startGame()
        }
    },100)
}

function Blank(){

}


function controls(controlConfig){
    if (!controlConfig){
        //should add better safegaurds here.
        controlConfig = []
        controlConfig.Up = Blank
        controlConfig.Down = Blank
        controlConfig.Left = Blank
        controlConfig.Right = Blank
        controlConfig.L = Blank
        controlConfig.R = Blank
        controlConfig.A = Blank
        controlConfig.B = Blank
        controlConfig.X = Blank
        controlConfig.Y = Blank
        controlConfig.Fullscreen = fullscreen
        controlConfig.Start = runTestGame
        controlConfig.Select = Blank
    }
    
    window.onresize = function(e) {
        resize()
    }
    document.onkeydown = function(e) {
        e = e || window.event
        key = e.which || e.keyCode
        // --- Directions ---
        if (key == 38) { //up
            controlConfig.Up() 
        }
        if (key == 40) { //down
            controlConfig.Down() 
        }
        if (key == 37) { //left
            controlConfig.Left() 
        }
        if (key == 39) { //right
            controlConfig.Right() 
        }
        // --- Actions ---
        if (key == 81) { //L (q)
            controlConfig.L() 
        }
        if (key == 87) { //R (w)
            controlConfig.R() 
        }
        if (key == 65) { //A (a)
            controlConfig.A() 
        }
        if (key == 83) { //B (s)
            controlConfig.B() 
        }
        if (key == 90) { //X (z)
            controlConfig.X() 
        }
        if (key == 88) { //Y (y)
            controlConfig.Y() 
        }
        // --- Options ---
        if (key == 32) { // (spacebar)
            controlConfig.Fullscreen() 
        }
        if (key == 77) { //Start (m)
            controlConfig.Start() 
        }
        if (key == 78) { //Select (n)
            controlConfig.Select() 
        }
    } 
}
