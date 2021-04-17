const express = require('express')
const path = require("path")
const http = require("http")
const indexRouter = require("./routers/indexRouter")
const mongoose = require("mongoose")
const favicon = require('serve-favicon');
const dotenv = require("dotenv")
const expressSession = require('express-session');
const bodyParser = require("body-parser")

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

dotenv.config({ path: path.join(__dirname, ".env") })

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

mongoose.connect("mongodb://localhost:27017/eastagram-api", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })

const session = expressSession({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(session)

app.use(express.static(path.join(__dirname, "./public")))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set(favicon(path.join(__dirname, "./public/img", "icon.png")))

app.use(express.json())

app.use("/", indexRouter)

server.listen(port, () => {
    console.log("Listening to server on port,", port)
})
