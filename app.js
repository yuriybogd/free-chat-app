const express = require("express")
const path = require('path')
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // add other server routes to path array
  //Bring in the routes
  app.use("/user", require("./routes/user"))
  app.use("/chatroom", require("./routes/chatroom"))
  app.use(proxy(['/api' ], { target: 'http://localhost:8000' }));
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Setup Cross Origin
const cors = require("cors")
app.use(cors())

//Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))


//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers")
app.use(errorHandlers.notFound)
app.use(errorHandlers.mongooseErrors)
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors)
} else {
  app.use(errorHandlers.productionErrors)
}

module.exports = app