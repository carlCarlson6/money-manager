import { type NextPage } from "next";
import { signIn, useSession, signOut } from "next-auth/react";

const Login: NextPage = () => {
    const { status } = useSession();

    return (<>
        <p>login page</p>
        <a 
            onClick={() => status === "unauthenticated" || status === "loading" ? signIn("auth0") : signOut()
        }>
            {status}
        </a>
    </>);
}

export default Login;
