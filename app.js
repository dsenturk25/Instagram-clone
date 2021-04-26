const express = require('express');
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');
const session = require("express-session");
const bodyParser = require("body-parser");

const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");
const shareRouter = require("./routers/shareRouter")
const userRouter = require("./routers/userRouter")

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://localhost:27017/eastagram-api", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(path.join(__dirname, "/public/res/img", "icon.png")));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use("/auth", authRouter);
app.use("/share", shareRouter);
app.use("/users", userRouter)
app.use("/", indexRouter);

server.listen(port, () => {
    console.log("Listening to server on port,", port);
});
