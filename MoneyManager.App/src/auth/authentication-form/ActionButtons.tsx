import { HStack, Button, Box } from "@chakra-ui/react";
import { useAuthStore  } from "../core/useAuthStore";
import { Spinner } from "./Spinner";
import { useLogin } from "../core/login";
import { useSignIn } from "../core/signin";

export const ActionButtons = () => {
	const { status } = useAuthStore();
	const login = useLogin();
	const signin = useSignIn();
	return (<>{
		status !== "loading" ?
			<HStack>
				<Box>
					<Button 
						colorScheme='blue' variant='outline'
						onClick={() => signin()}
					>
						sign in
					</ Button>
				</Box>
				<Box>
					<Button 
						colorScheme='blue' variant='outline'
						onClick={() => login()}
					>
						login
					</ Button>
				</Box>
			</HStack> :
			<Spinner />
		}</>);
}