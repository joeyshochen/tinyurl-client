import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
        createBrowserRouter,
        RouterProvider,
        // Route
} from 'react-router-dom';
import { NavBar } from './components/navbar';
// import axios from 'axios';
// import { tinyUrlServer } from './secrets/config';

// const redirect = async ({params}) => {
//         axios.get(`${tinyUrlServer}/${params.id}`
//         ).catch(error => {
//                 console.log(error);
//         }).then(result => {
//                 console.log(result);
//         })
// }

const router = createBrowserRouter([
        {
                path: '/',
                element: <App />
        },
        {
                path: '/:id',
                Component: () => {
                        console.log("hello123");
                        window.location.href = 'http://localhost:3001/123';
                                return null;
                }
        }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
                <NavBar />
                <RouterProvider router={router} />
        </React.StrictMode>
);
