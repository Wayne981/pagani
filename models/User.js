import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true, 

    }, 
    image: {            // profile picture
        type: String,
    },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board", // refering to some other models
        },
    ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
