import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
	createBrowserRouter,
	RouterProvider,
	useParams,
} from "react-router-dom";
import { NavBar } from "./components/navbar";
import { tinyUrlServer } from "./secrets/config";
import { URLTable } from "./components/urlTable";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/:id",
		Component: () => {
			const { id } = useParams();

			window.location.href = `${tinyUrlServer}/${id}`;

			// const tinyUrl = await axios.get(`${tinyUrlServer}/api/getTinyUrl/${id}`).catch(error => {
			//         console.log(error);
			// })

			// if (tinyUrl) {
			//         const result = await axios.put(`${tinyUrlServer}/api/updateTinyUrl/${id}`, {
			//                 ...tinyUrl,
			//                 "click": `${tinyUrl?.click + 1}` || "1"
			//         }).catch(error => {
			//                 console.log(error);
			//         });

			//         console.log("updated");
			//         console.log(result);
			// }

			return null;
		},
	},
	{
		path: "/myURLs",
		element: <URLTable />,
	},
	{
		path: "*",
		element: <h1>404 Not Found</h1>,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<NavBar />
		<RouterProvider router={router} />
	</React.StrictMode>
);
