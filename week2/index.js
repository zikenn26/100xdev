const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3001

// function middleware1(req,res,next){
//   // console.log("From inside Middleware " + req.headers.counter)
//   next();
// }  
// app.use(middleware1)
app.use(bodyParser.json())

function calculateSum(counter){
  var sum =0
  for (var i =0 ; i<=counter ; i++){
      sum+=i
  }
  return sum
}

function handleFirstRequest(req, res) {
  var counter = req.query.counter
  var calculatedSum = calculateSum(counter)
  var answerObject = {
    sum : calculatedSum
  }
  res.send(answerObject)
}
app.get('/handleSum', handleFirstRequest)

function started() {
  console.log(`app listening on port ${port}`)
}
app.listen(port, started)