const express = require("express")
const router = new express.Router()
const isAuth = require("../middleware/isAuth")
require("dotenv").config()

const registerPostController = require("../controllers/auth/register/post")
const loginPostController = require("../controllers/auth/login/post")
const profileGetController = require("../controllers/auth/profile/get")

router.use(express.json())

router.post(
    "/register", 
    registerPostController
)

router.post(
    "/login", 
    loginPostController
)

router.get(
    "/profile",
    isAuth, 
    profileGetController
)

module.exports = router