import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthStore } from "../core/useAuthStore";

export const PasswordInput = () =>  {
	const { updatePassword } = useAuthStore();
	const [showPassword, setShow] = useState(false);

	return (
		<InputGroup size='md'>
			<Input
				pr='4.5rem'
				type={showPassword ? 'text' : 'password'}
				placeholder='password'
				onChange={e => updatePassword(e.target.value)}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' onClick={() => setShow(!showPassword)}>
					{showPassword ? 'hide' : 'show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}