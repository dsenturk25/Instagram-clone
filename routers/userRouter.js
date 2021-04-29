const express = require('express');
const router = express.Router();

const isAuth = require("../middleware/isAuth");

const usersGetController = require("../controllers/user/get");
const usersSingleGetController = require("../controllers/user/getSingle");
const userSharesPostController = require("../controllers/user/postShares");
const userFollowingsSharesPostController = require("../controllers/user/postFollowingsShares");
const userFollowingsAddPostController = require("../controllers/user/postFollowingAdd");

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

router.post(
    "/followings/shares",
    isAuth,
    userFollowingsSharesPostController
)

router.post(
    "/following/add",
    isAuth,
    userFollowingsAddPostController
)

module.exports = router