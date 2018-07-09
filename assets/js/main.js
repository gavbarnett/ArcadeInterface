function openArcade() {
    //document.body.addEventListener('click',fullscreen)
    controls();
}

function resize(){
    var canvas = document.getElementById('canvas')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight       
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

function controls(){
    document.onkeydown = function(e) {
        e = e || window.event
        if (e.keyCode == 32) {
            fullscreen()
        }
    } 
}
