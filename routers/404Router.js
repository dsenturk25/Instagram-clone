const express = require('express')
const router = express.Router()

const $404GetController = require("../controllers/404/get")

router.get(
    "/*", 
    $404GetController
)

router.get(
    "/register/*", 
    $404GetController
)


module.exports = router