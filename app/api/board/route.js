const { default: User } = require("@/models/User");
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import Board from "@/models/Board";




export async function POST(req) {
    try {
    const body =  await req.json();
    

// we got the name here , next is verfication
if(!body.name) {
    return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
    );
}

// as auth is already imported
        const session = await auth();

     // now user is authenticated   
        if(!session) {
           return NextResponse.json(
            {error : "Not authorized"},
            {status: 401}

           );
        }

           // first it should be connected , wait for that and after that we can do the operations
           await connectMongo(); // from mongoose file , that's why it is imported


           // getting the user
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