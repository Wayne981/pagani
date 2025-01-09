import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    // id for it is given by default only . So , no need to create
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String, 
        required: true,
        trim : true,
       
    }
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);

