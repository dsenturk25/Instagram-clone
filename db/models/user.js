const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

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

userSchema.methods.createAuthenticationToken =  async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_TOKEN)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
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
