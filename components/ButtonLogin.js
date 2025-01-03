import Link from "next/link";

const ButtonLogin = (props) => {
console.log(props); 




if (props.isLogged){
    return <Link href="/dashboard">ButtonLogin</Link>
} else {
    return <button>Login</button>;
}
};

export default ButtonLogin;
