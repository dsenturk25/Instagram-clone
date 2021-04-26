const User = require("../../../models/user/user");

module.exports = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.session.userID, { 
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            bio: req.body.bio,
            website: req.body.website,
            gender: req.body.gender
        });
        await user.save();
        res.send({ user });
    } catch (e) {
        res.status(400).send(e);
    }
}