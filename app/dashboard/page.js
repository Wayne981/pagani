import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import Link from "next/link";
import { auth } from "@/auth"; // to get the user session
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import "@/models/Board"; // This will ensure Board model is registered


async function getUser() {
    // to get all the boards created by a particular user
    const session = await auth(); // getting the session
    await connectMongo();

    return await User.findById(session.user.id).populate("boards"); // if we have the user, it goes to this

    // from the "ref" as boards in the models , as described in the populate
}

export default async function  Dashboard() {

    const user = await getUser(); // gives the boards of the users as they are sessioned

    console.log(user);

    return (
        <main className="bg-base-200 min-h-screen">
            {/* Header */}
            <section className="bg-base-100">
                <div className="max-w-5xl mx-auto px-5 py-3 flex justify-end">
                    <ButtonLogout />
                </div>
            </section>
    
            <section className="max-w-5xl mx-auto px-5 py-12">
                <FormNewBoard />
                
                {/* Display user's boards */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Your Boards</h2>
                    {user.boards && user.boards.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.boards.map((board) => (
                                <Link href={`/dashboard/b/${board._id}`} key={board._id} className="block">
                                    <div className="bg-base-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-lg">{board.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">You haven't created any boards yet. Use the form above to get started!</p>
                    )}
                </div>
            </section>
        </main>
    );
}