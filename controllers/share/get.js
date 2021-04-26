
const Share = require("../../models/share/share");

module.exports = (req, res) => {
    try {
        const shares = Share.find({ owner: req.session.userID });
        res.status(200).send({shares});
    } catch (e) {
        res.status(404).send(e);
    }
}