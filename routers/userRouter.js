const express = require('express');
const router = express.Router();

const isAuth = require("../middleware/isAuth");

const usersGetController = require("../controllers/user/get");
const usersSingleGetController = require("../controllers/user/getSingle");
const userSharesPostController = require("../controllers/user/postShares");

router.get(
    "/getAll",
    isAuth,
    usersGetController
)

router.get(
    "/",
    isAuth,
    usersSingleGetController
)

router.post(
    "/shares",
    isAuth,
    userSharesPostController
)

module.exports = router