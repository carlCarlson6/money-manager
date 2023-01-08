import { Dropdown, User, Text } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const UserBadge = () => {
    const {data} = useSession();
    return (
        <Dropdown>
            <Dropdown.Trigger >
                <User
                    size="lg"
                    src={data?.user?.image ?? ""}
                    zoomed
                    as="button"
                    color="secondary"
                    bordered
                    name={data?.user?.name}
                    description={data?.user?.email ?? undefined}
                />
            </Dropdown.Trigger>
            <Dropdown.Menu
                color="secondary" 
                aria-label="Avatar Actions"
            >
                <Dropdown.Item 
                    key="profile" 
                    css={{ height: "$18" }}
                >
                    <UserBadgeText text="signed in as" />
                    <UserBadgeText text={data?.user?.email} />
                </Dropdown.Item>
                <Dropdown.Item 
                    key="logout" 
                    color="error" 
                    withDivider
                    
                >
                    <Text 
                        color="inherit" 
                        onClick={(e) => signOut()}
                    >
                        sing out
                    </Text>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

const UserBadgeText = ({text}: {text: string|null|undefined}) => (<>
    <Text 
        b 
        color="inherit" 
        css={{ d: "flex" }}
    >
        {text ?? ""}
    </Text>
</>);