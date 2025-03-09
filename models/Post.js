// A model for a post document in the database . Each post has a title , description , a boardId to which it belongs , and a userId (optional) of the user who created it (if logged in). The boardId and userId fields are references to the board  and User models respectively.

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        trim: true,
        // Max length should be 100 characters
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Board", // reference to the Board model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the User model
    },
    votesCounter: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// if there is already a existing connection to the database keep it , or else change it to form a new connection
// cause 100 db connections should be avoided
export default mongoose.models.Post || mongoose.model("Post", postSchema);
