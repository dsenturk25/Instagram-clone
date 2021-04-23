const express = require("express")
const router = new express.Router()
const isAuth = require("../middleware/isAuth")
require("dotenv").config()

const registerPostController = require("../controllers/auth/register/post")
const loginPostController = require("../controllers/auth/login/post")
const profileGetController = require("../controllers/auth/profile/get")
const homeProfilePatchController = require("../controllers/auth/profile/homepatch")
const profilePatchController = require("../controllers/auth/profile/patch")

router.use(express.json())

router.post(
    "/register", 
    registerPostController
)

router.post(
    "/login", 
    loginPostController
)

router.patch(
    "/profile/bio",
    isAuth,
    homeProfilePatchController
)

router.patch(
    "/profile",
    isAuth,
    profilePatchController
)

router.get(
    "/profile",
    isAuth,
    profileGetController
)

module.exports = router