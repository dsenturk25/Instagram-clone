
const User = require("../../../models/user")

module.exports = async (req, res) => {
    try {
        const user = User.createUser(req.body)
        req.session.userID = user._id
        res.redirect("/home")
        res.status(201).send({user})
    } catch (e) {
        res.status(400).send(e)
    }
}