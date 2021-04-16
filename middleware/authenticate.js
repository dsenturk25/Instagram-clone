const User = require("../db/models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = async (req, res, next) => {
    try{
        const authToken = req.header("Authorization").replace("Bearer ", "")
        const authID = jwt.verify(authToken, process.env.JWT_TOKEN)
        const user = await User.findById(authID._id)
        if (!user) {
            throw new Error()
        }

        await user[tokens].forEach(token => {
            if (token.token === authToken) {
                req.session.user = user
                next()
            }
        })

    } catch(e) {
        res.status(401).send({"error": "Please authenticate"})
    }
}

module.exports = authenticate