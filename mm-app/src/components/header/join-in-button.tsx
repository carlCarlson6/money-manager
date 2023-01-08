import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export const JoinInButton = () => (
    <Button 
        auto flat
        onClick={() => signIn("auth0")}
    >
        <p>join in</p>
    </Button>
);