// Get board with ObjectID 'boardId'

// passing boardId to retrieve the board from the db
// const board - finding board from the board collection
// return board 


// const board = gets the boardId

import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { auth } from "@/auth";



const getBoard = async (boardId) => {
const session = await auth();

    await connectMongo();

    const board = await Board.findOne({
        _id: boardId,
        userId : session?.user?.id, // board defined by that session's userId
    });

    if (!board) {
        redirect("/dashboard");
    }
    

    return board;
};

export default async function FeedbackBoard({params}) {
const { boardId } = params;

const board = await getBoard(boardId);

return <main>{board.name}</main>;

}



