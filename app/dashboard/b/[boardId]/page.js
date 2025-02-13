// Get board with ObjectID 'boardId'

// passing boardId to retrieve the board from the db
// const board - finding board from the board collection
// return board 


// const board = gets the boardId

import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";

const getBoard = async (boardId) => {
    await connectMongo();

    const board = await Board.findById(boardId);

    return board;
};

export default async function FeedbackBoard({params}) {
const { boardId } = params;

const board = await getBoard(boardId);

return <main>{board.name}</main>;

}



