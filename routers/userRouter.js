const express = require('express');
const router = express.Router();

const isAuth = require("../middleware/isAuth");

const usersGetController = require("../controllers/user/get")

router.get(
    "/getAll",
    isAuth,
    usersGetController
)

module.exports = router