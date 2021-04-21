
const User = require("../../../models/user")
const { sendGreetingEmail } = require("../../../utils/sendEmail")

module.exports = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendGreetingEmail(user.email, user.name)
        res.status(201).send({user})
    } catch (e) {
        res.status(400).send(e)
    }
}