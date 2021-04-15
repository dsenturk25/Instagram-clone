const User = require("../db/models/user")
require("dotenv").config()

const authenticate = async (req, res, next) => {
    try{
        const token = req.header("authorization").replace("Bearer ", "")
        const user = await User.findOne({ "tokens.token": token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()

    } catch(e) {
        res.status(401).send({"error": "Please authenticate"})
    }
}

module.exports = authenticate