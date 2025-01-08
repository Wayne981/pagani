"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";

const ButtonLogin = ({ session, extraStyle }) => {
    const dashboardUrl = "/dashboard"

    // if session cookie is present , display welcome back name in button , or else show login
    if (session) {
        return (
            <Link 
                href={dashboardUrl}
                className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
            >
                Welcome back {session.user.name || "friend"}
            </Link>
        );
    } 
    return (
        <button
            className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
            onClick={() => {
                signIn(undefined, {callbackUrl: dashboardUrl}); // conditional rendering
            }}
        >
            {/* undefined cause - we have two signin providers , google and resend , if google provide madudhre , it will show google */}
            Get started
        </button>
    );
};

export default ButtonLogin;