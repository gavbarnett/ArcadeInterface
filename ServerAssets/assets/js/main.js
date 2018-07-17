function openArcade() {
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
    var client = new HttpClient();
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
    //base_image = new Image();

    client.get('/listAllGames', function(response) {
        gamesList = JSON.parse (response)
        var gameImage =[]
        console.log (gamesList.length)
        for (i = 0; i < gamesList.length; i++){
            gameImage[i] = new Image();
            gameImage[i].src = 'games/' + gamesList[i].file + '/assets/cartridge.png';
        }
        gameImage[gamesList.length-1].onload = function(){
        for (i = 0; i < gamesList.length; i++){
            var scaler = (gameImage[i].height/canvas.height)/0.25
            context.drawImage(gameImage[i], (canvas.width-gameImage[i].width/scaler/2)*1/(gamesList.length+2)*(i+1), canvas.height*0.5+(canvas.height*0.3-gameImage[i].height/scaler)/(gamesList.length+2)*i,gameImage[i].width/scaler,gameImage[i].height/scaler);
        }
    }
    });
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
    //don't delete
    //might be better under controls function
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

class HttpClient {
    constructor() {
        this.get = function (aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            };
            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        };
    }
}
