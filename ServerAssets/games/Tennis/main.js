
var tennis = {
  paused = false,

  load: function() {
    //first function called by main arcade program
    console.log("Game loading....")
    controlSetup();
    start();
  },

  controlSetup: function(){
    console.log("Configuring Controls")
    var controlConfig = []
        // replace = x with functions
        // no parenthesis ()
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
        // configures the above controls
        controls(controlConfig)
  },

  start : function() {
    console.log("Game starting....")
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

