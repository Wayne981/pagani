import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
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
                {/* <h1>private dashboard</h1> */}
                <ButtonLogout />
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-5 py-12">
                <FormNewBoard />
            </section>
        </main>
    );
}
