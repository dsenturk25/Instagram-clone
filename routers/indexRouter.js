const express = require('express');
const router = express.Router();

const isAuth = require("../middleware/isAuth");

const indexGetController = require("../controllers/index/index/get");
const registerGetController = require("../controllers/index/register/get");
const $404GetController = require("../controllers/index/notfound/get");
const homeGetController = require("../controllers/index/home/get");
const profileGetController = require("../controllers/index/profile/get");

router.get(
    "/", 
    indexGetController
);

router.get(
    "/register",
    registerGetController
);

router.get(
    "/home",
    isAuth,
    homeGetController
);

router.get(
    "/profile",
    isAuth,
    profileGetController
);

router.get(
    "/*",
    $404GetController
);

module.exports = router;