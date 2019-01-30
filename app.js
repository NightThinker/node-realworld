const http = require('http');
const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log("In the Middleware")
  next()  //allow the request to continue to the next middleware in line
})

app.use((req, res, next) => {
  console.log("In another Middleware")
  res.send('<h1>Hello from Express!!!</h1>')
})

app.listen(3000);