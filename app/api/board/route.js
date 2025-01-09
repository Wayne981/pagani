const { default: User } = require("@/models/User");
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Board from "@/models/Board";




export async function POST(req) {
    try {
    const body =  await req.json();
    


if(!body.name) {
    return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
    );
}

        const session = await auth();

        if(!session) {
           return NextResponse.json(
            {error : "Not authorized"},
            {status: 401}

           );
        }

           
           await connectMongo(); // from mongoose file , that's why it is imported

           const user = await User.findById(session.user.id);



           const board = await Board.create({  // for board creation 
            userId : user._id,
            name : body.name,    // name fetched , for the board name
           });

           // Add the board to the user's boards array
           user.boards.push(board._id); // pushing to the boards array
           await user.save();           // saving it

           return NextResponse.json({}); // have to return something , to close the endpoint
        } catch (e) {
            return NextResponse.json({error : e.message}, { status: 500});
        }




    }