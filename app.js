const express = require('express')
const path = require("path")
const userRouter = require("./routers/userRouter")
const indexRouter = require("./routers/indexRouter")
const $404Router = require("./routers/404Router")
const registerRouter = require("./routers/registerRouter")
const mongoose = require("mongoose")
const favicon = require('serve-favicon');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use("/", indexRouter)
app.use(registerRouter)
app.use($404Router)

mongoose.connect("mongodb://localhost:27017/eastagram-api", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory))

app.set(favicon(path.join(__dirname, "./public/img", "icon.png")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(port, () => {
    console.log("Listening to server on port,", port)
})
