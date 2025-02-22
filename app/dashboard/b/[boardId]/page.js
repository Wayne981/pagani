// private
// Get board with ObjectID 'boardId'

// passing boardId to retrieve the board from the db
// const board - finding board from the board collection
// return board 


// const board = gets the boardId

import React from 'react';
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { auth } from "@/auth";
import CardBoardLink from '@/components/CardBoardLink';

const getBoard = async (boardId) => {
    const session = await auth();
    await connectMongo();
    
    const board = await Board.findOne({
        _id: boardId,
        userId: session?.user?.id,        
    });
    
    if (!board) {
        redirect("/dashboard");  
    }
    
    return board;
};

export default async function FeedbackBoard({ params }) {
    const { boardId } = params;
    const board = await getBoard(boardId);
    
    return (
        <main className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            
            
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {board.name}
                </h1>

{/* since the name depends on board id it is mentioned here */}
                <CardBoardLink boardId={board._id}/> 
            </div>

            
        </main>
    );
}