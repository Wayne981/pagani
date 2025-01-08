import Link from "next/link";

const ButtonLogin = ({ session, extraStyle }) => {
    // if session cookie is present , display welcome back name in button , or else show login
    if (session) {
        return (
            <Link 
                href="/dashboard"
                className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
            >
                Welcome back {session.user.name || "friend"}
            </Link>
        );
    } 
    return <button>Login</button>;
};

export default ButtonLogin;
