const express = require('express')
const app = express()
const fs = require('fs');

//give access to directories
app.use("/assets", express.static(__dirname + '/ServerAssets/assets'))
app.use("/games", express.static(__dirname + '/ServerAssets/games'))

//server static webpage
app.get('/', function(req,res){
  res.sendFile(__dirname + '/ServerAssets/index.html')
  console.log("New user #" + Math.round(Date.now()*Math.random()*1).toString(36).toUpperCase())
})

//list available games
app.get('/listAllGames', function(req,res){
  res.contentType('application/json');
  var gamesList = []
  var folderPath = './ServerAssets/games'
  fs.readdirSync(folderPath).forEach(file => {
    //if not starting with underscore
    if ((file.substr(0,1)) != '_'){
      gamesList.push({file})
    }
  })
  var gamesJSON = JSON.stringify(gamesList);
  res.send(gamesJSON)
  console.log(gamesJSON)
  console.log("sent list of games")
})

//start listening and log
app.listen(80, () => console.log("Server is listening"))