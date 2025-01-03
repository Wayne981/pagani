import Link from "next/link";

const ButtonLogin = (props) => {
 




if (props.isLoggedIn){
    return <Link href="/dashboard">Welcome back {props.name}</Link>
} else {
    return <button>Login</button>;
}
};

export default ButtonLogin;
