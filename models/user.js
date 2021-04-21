const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const { sendGreetingEmail } = require("../utils/sendEmail")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 4,
        maxlength: 16
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid email.")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        validate(value){
            if (value.includes("password")) {
                throw new Error("Your password is not secure.")
            }
        }
    }
})

userSchema.statics.createUser = async function(body) {
    const newUser = new User(body)
    await newUser.save()
    sendGreetingEmail(newUser.email, newUser.name)
    return newUser
}

userSchema.statics.loginUser = async function(email, password){

    const user = await User.findOne({email: email})

    if(!user){
        throw new Error("Cannot find user")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error("Password incorrect")
    }

    return user
}

userSchema.pre("save", async function(next){
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
