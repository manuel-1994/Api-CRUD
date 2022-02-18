const express = require('express')
const path = require("path")
const users = require('./router/users.routes')
const app = express()


//middleware
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
//routes
app.use('/users',users().routerView);
app.use('/api/users', users().router)


//server
app.listen(4000, ()=>{
  console.log(`App running in http://localhost:${4000}`);
})