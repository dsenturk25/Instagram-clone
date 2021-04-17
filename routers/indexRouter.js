const express = require('express')
const router = express.Router()

const indexGetController = require("../controllers/index/get")
const registerGetController = require("../controllers/register/get")
const $404GetController = require("../controllers/404/get")

router.get(
    "/", 
    indexGetController
)

router.get(
    "/register",
    registerGetController
)

router.get(
    "/*",
    $404GetController
)

module.exports = router