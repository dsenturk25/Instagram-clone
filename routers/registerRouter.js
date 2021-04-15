const express = require('express')
const router = express.Router()

const registerGetController = require("../controllers/register/get")

router.get(
    "/register", 
    registerGetController
)

module.exports = router