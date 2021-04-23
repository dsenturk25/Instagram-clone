const User = require("../../../models/user")

module.exports = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.session.userID, { bio: req.body.bio })
        await user.save()
        res.send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
}