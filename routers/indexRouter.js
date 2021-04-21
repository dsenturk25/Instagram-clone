const express = require('express')
const router = express.Router()

const indexGetController = require("../controllers/index/index/get")
const registerGetController = require("../controllers/index/register/get")
const $404GetController = require("../controllers/index/notfound/get")

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