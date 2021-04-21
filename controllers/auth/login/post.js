
const User = require("../../../models/user")

module.exports = async(req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password)
        res.status(200).send({user})
    } catch (e) {
        res.status(400).send(e)
    }
}