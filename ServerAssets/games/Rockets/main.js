
var tennis = {
  paused = false,

  load: function() {
    //first function called by main arcade program
    console.log("Game Loading....")
    myGameArea.start();
  },

  start : function() {
    updateGameArea();
  },

  clear : function() {
    canvas = document.getElementById('canvas'); 
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  },

  updateGameArea : function() {
    if (!paused) {
      requestAnimationFrame(updateGameArea);
    } else {
        return false;
        //function exits here is pause = true
    }
      myGameArea.clear();
      Console.log("Tennis")

  }

}

