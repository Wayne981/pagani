// import mongoose from "mongoose";
// import User from "@/models/User";
// import Board from "@/models/Board";

// const connectMongo = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL); // trying to connect to the database
//     } catch(e) {
//         console.error("Mongoose error ⾮" + e.message);
//     }
    
// };

// export default connectMongo;


import mongoose from "mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

const connectMongo = async () => {
    try {
        // trying to connect to the database
        mongoose.set('strictQuery', false);
        
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    } catch(e) {
        console.error("Mongoose error ⾮" + e.message);
        throw e;
    }
};

export default connectMongo;