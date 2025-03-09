// public board

import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import FormAddPost from "@/components/FormAddPost";
import CardPost from "@/components/CardPost";

const getData = async (boardId) => {


    await connectMongo();

    const board = await Board.findById(boardId);
    const posts = await Post.find({boardId}).sort({createdAt: -1}); // gives a timestamps 
// -1 tells that we sort with the most recently created document


    if (!board) {
        redirect("/");
    }

    return{
        board,
        posts,
    };
    
};

export default async function PublicFeedbackBoard({params}) {
const { boardId } = params;


