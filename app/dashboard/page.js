import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import Link from "next/link";
import { auth } from "@/auth"; // to get the user session
import connectMongo from "@/libs/mongoose"; //
import User from "@/models/User";
import "@/models/Board"; // Ensure Board model is registered

async function getUser() {
    // to get all the boards created by a particular user
    const session = await auth(); // getting the session
    await connectMongo(); //
    return await User.findById(session.user.id).populate("boards");
    // from the "ref" as boards in the models, as described in the populate
}

export default async function Dashboard() {
    const user = await getUser(); // gives the boards of the users as they are sessioned
    
    return (
        <main className="bg-base-200 min-h-screen text-gray-900">
            {/* Header */}
            <header className="bg-base-100 shadow-md">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-primary">Dashboard</h1>
                    <ButtonLogout />
                </div>
            </header>
    
            <section className="max-w-5xl mx-auto px-6 py-12">
                <FormNewBoard />
    
                {/* Display user's boards */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-5">Your Boards</h2>
                    {user.boards && user.boards.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.boards.map((board) => (
                                <Link 
                                    href={`/dashboard/b/${board._id}`} 
                                    key={board._id} 
                                    className="block group"
                                >
                                    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-transform transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-primary/30">
                                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary">
                                            {board.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-4 text-center">
                            You haven't created any boards yet. Use the form above to get started!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
