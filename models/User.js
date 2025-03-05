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
    // profile picture
    image: {            
        type: String,
    },
    // assuming they are not subscribed
    hasAccess:{
        type:Boolean , 
        default: false, 
    },

    // for lemonsqueezy
    customerId : {
        type:String,
    },
    // planId : if the user has multiple plans

    // refering to some other models
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board", 
        },
    ],
});

// check is board exist , or else , create a new model for the board
export default mongoose.models.User || mongoose.model("User", userSchema);