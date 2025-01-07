import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/mongo";
import Resend from "next-auth/providers/resend";

import Google from "next-auth/providers/google";



const config = {
    providers: [
        Resend({
            apiKey : process.env.RESEND_KEY,
            from: " noreply@resend.navaneethcaterers.com"
         
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    // this mongodb adapter will have access to our database - now aut.js has access to ur mongodb database

};

// const auth = NextAuth(config)
// giving config file to next auth
// as we are going to use it everywhere
export const {handlers , signIn , signOut , auth} = NextAuth(config);

