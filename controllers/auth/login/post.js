
const User = require("../../../models/user/user");

module.exports = async(req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password);
        req.session.userID = user._id;
        res.redirect("/home");
    } catch (e) {
        res.status(400).send(e);
    }
}