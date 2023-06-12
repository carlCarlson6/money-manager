import { Center, FormControl, FormErrorMessage, Input, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../core/useAuthStore";
import { ActionButtons } from "./ActionButtons";
import { PasswordInput } from "./PasswordInput";

export const AuthenticationForm = () => {
	const { updateUserName, status } = useAuthStore();
	const isError = status === "error";

	return (
		<form>
			<FormControl isInvalid={isError}>
				<VStack>
					<Input 
						placeholder="user name"
						onChange={e => updateUserName(e.target.value)}
					/>
					<PasswordInput />
					{
						isError ? <FormErrorMessage>wrong credentials</FormErrorMessage> : <></>
					}
					<Center>
						<ActionButtons />
					</Center>
				</VStack>
			</FormControl>
		</form>
	);
}
