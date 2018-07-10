const express = require('express')
const app = express()

//give access to directories
app.use("/assets", express.static(__dirname + '/ServerAssets/assets'))
app.use("/games", express.static(__dirname + '/ServerAssets/games'))

//server static webpage
app.get('/', function(req,res){
  res.sendFile(__dirname + '/ServerAssets/index.html')
  console.log("New user #" + Math.round(Date.now()*Math.random()*1).toString(36).toUpperCase())
})

//start listening and log
app.listen(80, () => console.log("Server is listening"))