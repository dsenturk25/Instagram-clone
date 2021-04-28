
const User = require("../../models/user/user");

module.exports = async (req, res) => {
    const users = await User.find({});
    try {
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e)
    }
}