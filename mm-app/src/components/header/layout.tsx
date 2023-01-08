import { ReactNode } from "react";
import { Box } from "./box";

export const Layout = ({children}: {children: ReactNode}) => (
    <Box
        css={{
            maxW: "100%"
        }}
    >
        {children}
    </Box>
)