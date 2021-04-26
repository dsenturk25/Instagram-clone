const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGreetingEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "dsenturk25@my.uaa.k12.tr",
        subject: "Welcome to Eastagram",
        text: `Hello ${name}, welcome. Nice to meet you!`
    });
};

module.exports = {sendGreetingEmail};