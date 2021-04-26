
const User = require("../../models/user/user");

var resUsersArray = [];

module.exports = async (req, res) => {
    const search = req.body.search
    const users = await User.find({});
    users.forEach(user => {
        if (user.username.includes(search)) {
            resUsersArray.push(user)
        } else {
            res.status(404);
        }
    });
    res.status(200).send(resUsersArray);
}