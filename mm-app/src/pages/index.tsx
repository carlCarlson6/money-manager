import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React from 'react';
import { isAuthenticated } from "../utils/is-authenticated";
import Login from "./login";

const Home: NextPage = () => {
	const {status} = useSession();

	if(!isAuthenticated(status)) return <Login />

  	return (
    	<>
			<p>hello world</p>
		</>
	);
};

export default Home;
