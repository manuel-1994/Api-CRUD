const express = require('express')
const path = require("path")
const app = express()


//middleware
app.use(express.static(path.join(__dirname,"views")))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())

//routes
app.get('/', (req,res)=>{
  res.sendFile('index.html')
})

//server
app.listen(4000, ()=>{
  console.log('app runing in port:' + 4000);
})