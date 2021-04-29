
const User = require("../../models/user/user");

module.exports = async (req, res) => {
    try {
        const authUser = await User.findById(req.session.userID);
        const followedUser = await User.findOne({ username: req.body.username, name: req.body.name });

        if (!authUser || !followedUser) {
            return res.status(404).send(); 
        }

        if (req.session.userID == followedUser._id) {
            return res.status(400).send("same_user");
        }

        await authUser.followings.push(followedUser._id);
        await authUser.save()
        await followedUser.followers.push(authUser._id);
        await followedUser.save()

        res.send(followedUser);
    } catch (e) {
        res.status(500);
    }
}