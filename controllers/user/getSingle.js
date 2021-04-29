
const User = require("../../models/user/user");
const Share = require("../../models/share/share");

module.exports = async (req, res) => {
    const username = req.query.username;
    const name = req.query.name;
    try {
        const user = await User.findOne({
            username: username,
            name: name
        });

        const sharesOfUser = await Share.find({ owner: user._id });

        const userObject = user.toObject()

        userObject.sharesOfUser = sharesOfUser;

        delete userObject.password;
        delete userObject.gender;
        delete userObject.__v;
        delete userObject.email;

        userObject.followers.forEach(id => {
            if (req.session.userID == id) {
                userObject.followText = "Following";
            } else {
                userObject.followText = "Follow";
            }
        })
        if (userObject.followers == 0) {
            userObject.followText = "Follow";
        } 
        
        res.render("index/user", {
            userObject,
            page:"user",
            includes: {
                external: ["css", "js"]
            }
        })
    } catch (e) {
        res.status(404).send(e);
    }
}