import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/header";
import { Layout } from "../components/header/layout";

type AppSession = { session: Session | null }

const MyApp: AppType<AppSession> = ({Component, pageProps: { session, ...pageProps },}) => (
	<SessionProvider session={session}>
		<NextUIProvider>
			<Header />
			<Component {...pageProps} />
		</NextUIProvider>
	</SessionProvider>
);

export default trpc.withTRPC(MyApp);
