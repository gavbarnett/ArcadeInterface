
var paused = false;
function startGame() {
  myGameArea.start();
}

var myGameArea = {   
  start : function() {
        this.canvas = document.getElementById('canvas'); 
        this.context = this.canvas.getContext("2d");
        updateGameArea();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function squid(size, shcolor, x, y, divspeed, split) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.shcolor = shcolor;
    this.divspeed = divspeed;
    this.drain = 0.01*divspeed/50;
    this.split = split;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI, false);
        ctx.fillStyle = this.shcolor;
        ctx.fill();
        ctx.strokeStyle = '#ffffff'
        ctx.stroke();
    }
}

function food(size, shcolor, x, y, split) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.shcolor = shcolor;
    this.split = Math.max(2, split);
    this.growth = 0.01*6/split;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI, false);
        ctx.fillStyle = this.shcolor;
        ctx.fill();
        ctx.strokeStyle = '#000000'
        ctx.stroke();
    }
}

function msg(text, x, y){
  this.text = text;
  this.color = 'white';
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.font = "16px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = "left";
    ctx.fillText(this.text,this.x, this.y);//this.text, this.x, this.y);
  }
}

function updateGameArea() {
  if (!paused) {
    requestAnimationFrame(updateGameArea);
  } else {
      return false;
  }
    myGameArea.clear();
}

