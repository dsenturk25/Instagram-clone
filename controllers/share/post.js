
const Share = require("../../models/share/share")
const sharp = require("sharp");

module.exports = async(req, res) => {
    try {
        const fileBuffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
        const share = Share.createNewShare(fileBuffer, req.session.userID)
        res.status(201).send(share)
    } catch (e) {
        res.status(401).send(e)
    }
}