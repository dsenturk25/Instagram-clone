const User = require("../../../models/user/user");

module.exports = async (req, res) => {
    const user = await User.findById(req.session.userID);
    
    return res.render("index/home", {
        title: "Eastagram Home",
        page: "home",
        includes: {
            external: ["css", "js"]
        },
        username: user.username,
        name: user.name,
        bio: user.bio
    });
}