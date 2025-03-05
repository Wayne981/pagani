import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
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
        // from mongoose file , that's why it is imported . ConnectMongo from mongoose.js in libs
        await connectMongo();

        // getting the user
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                {error : "User not found"},
                {status: 404}
            );
        }

        if(!user.hasAccess) {
            return NextResponse.json(
                {error : "Please subscribe first"},
                {status:403}
            );
        } 

        // for board creation 
        const board = await Board.create({
            userId : user._id,
            // name fetched , for the board name
            name : body.name,    
        });

        // pushing to the boards array
        user.boards.push(board._id);
        // saving it
        await user.save();           

        // have to return something , to close the endpoint
        return NextResponse.json({ board }, { status: 201 }); 
    } catch (e) {
        return NextResponse.json({error : e.message}, { status: 500});
    }
}

export async function DELETE(req) {
    try {
        // DELETE http://localhost:3000/api/board?boardId=o6i4d3mfoi3

        // we will get the query parameters of the link
        const searchParams = req.nextUrl.searchParams;
        const boardId = searchParams.get("boardId");

        // returns an error if board is not present
        if (!boardId) {
            return NextResponse.json(
                { error: "boardId is required" },
                { status: 400 }
            );
        }

        const session = await auth();

        // same for the session 
        if (!session) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 401 }
            );
        }

        await connectMongo();

        const user = await User.findById(session?.user?.id);

        if (!user) {
            return NextResponse.json(
                {error : "User not found"},
                {status: 404}
            );
        }

        // if user has not access , next things are not given access
        if(!user.hasAccess) {
            return NextResponse.json(
                {error : "Please subscribe first"},
                {status:403}
            );
        } 

        const deletedBoard = await Board.findOneAndDelete({
            _id: boardId,
            userId: session?.user?.id,
        });

        if (!deletedBoard) {
            return NextResponse.json(
                { error: "Board not found or you don't have permission" },
                { status: 404 }
            );
        }

        user.boards = user.boards.filter((id) => id.toString() !== boardId);
        await user.save();

        return NextResponse.json(
            { message: "Board deleted successfully" },
            { status: 200 }
        );

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}