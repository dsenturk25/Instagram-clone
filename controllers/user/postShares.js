
const User = require("../../models/user/user");
const Share = require("../../models/share/share");

module.exports = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;

    try {
        const user = await User.findOne({username: username, name: name});

        if (!user) {
            return res.send("Cannot find user");
        }

        const sharesOfUser = await Share.find({owner: user._id});
        res.send(sharesOfUser)
    } catch (e) {
        res.status(404).send(e);
    }
}