const express = require("express")
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Setup Cross Origin
const cors = require("cors")
app.use(cors())

//Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

//Bring in the routes
app.use("/user", require("./routes/user"))
app.use("/chatroom", require("./routes/chatroom"))

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