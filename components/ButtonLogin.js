import Link from "next/link";

const ButtonLogin = (props) => {
 




if (props.isLoggedIn){
    return <Link href="/dashboard" className="btn btn-primary">Welcome back {props.name}</Link>
} else {
    return <button>Login</button>;

// 1. Create a /login page

// 2. Create a email/password form

// 3. Make a POST request to /api/login


}
};

export default ButtonLogin;
