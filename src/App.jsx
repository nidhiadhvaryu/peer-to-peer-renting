import React, { useEffect } from 'react';
import {  RouterProvider } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import {router} from './components/Routing/Routes'


export default function App() {

	console.log(router)
	return <RouterProvider router={router} />;
}



