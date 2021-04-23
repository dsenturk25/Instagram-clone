
const User = require("../../../models/user")

module.exports = async (req, res) => {

    const user = await User.findById(req.session.userID)

    return res.render("index/profile", {
        page: "profile",
        includes: {
            external: ["css", "js"]
        },
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        bio: user.bio,
        website: user.website,
        gender: user.gender,
    })
}