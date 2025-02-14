// Get board with ObjectID 'boardId'

// passing boardId to retrieve the board from the db
// const board - finding board from the board collection
// return board 


// const board = gets the boardId

// This is the private feedback board page

import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { auth } from "@/auth";
import Link from "next/link";
import { 
    CalendarIcon, 
    MessageSquareIcon, 
    UsersIcon, 
    SettingsIcon,
    ChevronLeftIcon
} from "lucide-react";
import CardBoardLink from "@/components/CardBoardLink";

const getBoard = async (boardId) => {
    const session = await auth();
    await connectMongo();

    const board = await Board.findOne({
        _id: boardId,
        userId: session?.user?.id, // board defined by that session's userId
    });

    if (!board) {
        redirect("/dashboard");
    }
    
    return board;
};

export default async function FeedbackBoard({params}) {
    const { boardId } = params;
    const board = await getBoard(boardId);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <div className="mb-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 group"
            >
              <ChevronLeftIcon className="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-2xl font-bold text-white">{board.name}</h1>
                  <p className="text-blue-100 mt-1">Private feedback board</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Invite Team
                  </button>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    Share Board
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <MessageSquareIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-500">Total Feedback</p>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-500">Active Users</p>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <CalendarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-500">Created On</p>
                      <p className="text-2xl font-semibold">{new Date(board.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <SettingsIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-orange-500">Settings</p>
                      <p className="text-sm text-gray-500">Configure your board</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900">No feedback collected yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Share your board with users to start collecting valuable feedback
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Get Started Guide
                  </button>
                  
                  <div className="mt-4">
                    <CardBoardLink boardId={boardId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
}