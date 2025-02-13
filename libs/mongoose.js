import mongoose from "mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch(e) {
        console.error("Mongoose error ⾮" + e.message);
    }
    
};

export default connectMongo;
