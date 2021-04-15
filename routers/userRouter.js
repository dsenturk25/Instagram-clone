const express = require("express")
const User = require("../db/models/user")
const router = new express.Router()
const authenticate = require("../middleware/authenticate")
require("dotenv").config()

router.use(express.json())

router.post("/users", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.createAuthenticationToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async(req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.createAuthenticationToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/users/profile", authenticate, (req, res) => {
    res.send(req.user)
})

module.exports = router