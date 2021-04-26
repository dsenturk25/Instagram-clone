const express = require("express");
const router = new express.Router();
const isAuth = require("../middleware/isAuth");
const multer = require("multer")

const shareGetRouter = require("../controllers/share/get");
const sharePostRouter = require("../controllers/share/post");

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        
        if(!file.originalname.match(/\.(jpg|jpeg|png|img)$/)){
            return cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
    }
})

router.use(express.json());

// Get tasks of user
router.get(
    "/get",
    isAuth,
    shareGetRouter
)

// Create new task
router.post(
    "/create",
    isAuth,
    upload.single("photo"),
    sharePostRouter
)

module.exports = router;