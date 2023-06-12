import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './auth/routes.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	...authRoutes,
]);

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>,
);