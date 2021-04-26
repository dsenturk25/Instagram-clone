const mongoose = require("mongoose");

const shareSchema = mongoose.Schema({

    content: {
        type: Buffer,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    }
})

shareSchema.statics.createNewShare = async (content, userID) => {
    const newShare = new Share({
        content: content,
        owner: userID
    });

    await newShare.save();
    return newShare;
}

const Share = mongoose.model("Share", shareSchema);

module.exports = Share;