import { Box, Container, HStack, VStack, Text, Divider } from "@chakra-ui/react";
import { AuthGuard } from "./auth/AuthGuard"
import { GroupsList } from "./groups/GroupsList";
import { SelectedGroup } from "./groups/SelectedGroup";

const _App = () => {
	return (
		<>
			<HStack padding={"3"} h='100px'>
				<Box >
					<VStack  >
						<Text fontSize={"2xl"}>money manager 💸</Text>
						<Divider/>
						<GroupsList />
					</VStack>	
				</Box>
				<Container>
					<SelectedGroup />
				</Container>
			</HStack>
		</>
	);
}

export const App = () => <>
	<AuthGuard>
		<_App />
	</AuthGuard>
</>;