import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    // id for it is given by default only . So , no need to create
    userId: {
        type: mongoose.Schema.Types.ObjectId, // special type from mongoose - number , decimal or boolean
        required: true,
        ref: "User",
    },
    name: {
        type: String, 
        required: true,
        trim : true,
       
    }
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema); // check is board exist , or else , create a new model for the board

