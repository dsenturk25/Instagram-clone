const User = require("../../../models/user")

module.exports = async (req, res) => {
    const user = await User.findById(req.session.userID)
    res.send({user})
}