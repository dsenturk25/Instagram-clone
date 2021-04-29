
const User = require("../../models/user/user");
const Shares = require("../../models/share/share");

module.exports = async (req, res) => {
    
    try {
        const user = await User.findById(req.session.userID);
        var sharesArray = [];
        var shares;
        var owner;
        for (let i = 0; i < user.followings.length; i++) {
            const id = user.followings[i];
            shares = await Shares.find({ owner: id });
            owner = await User.findById(id);
            shares.push({username: owner.username})
            sharesArray.push(shares);
        }
        res.send(sharesArray);
    } catch (e) {
        res.status(500);
    }
}