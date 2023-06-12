import { Box, Center, Container, VStack, Text } from "@chakra-ui/react";
import { AuthenticationForm } from "./authentication-form/AuthenticationForm";

export const AuthPage = () => (
    <Container padding={25}>
        <Center>
            <VStack
                spacing={3}
            >
                <Box>
                    <Text fontSize={"3xl"}>introduce your credentials</Text>
                </Box>
                <Box>
                    <AuthenticationForm />
                </Box>
            </VStack>
        </Center>
    </Container>
);