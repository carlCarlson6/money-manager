import { Navbar, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { isAuthenticated } from "../../utils/is-authenticated";
import { JoinInButton } from "./join-in-button";
import { Layout } from "./layout";
import { UserBadge } from "./user-badge";

export const Header = () => {
    const { status } = useSession();
    return (
        <Layout>
            <Navbar isBordered variant={"sticky"}>
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs">
                        Money Manager
                    </Text>
                </Navbar.Brand>
                <Navbar.Content>
                    <Navbar.Item>
                        { isAuthenticated(status) ? <UserBadge /> : <JoinInButton /> }
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </Layout>
    );
};
