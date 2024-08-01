import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
        createBrowserRouter,
        RouterProvider,
        useParams
} from 'react-router-dom';
import { NavBar } from './components/navbar';
import { tinyUrlServer } from './secrets/config';

const router = createBrowserRouter([
        {
                path: '/',
                element: <App />
        },
        {
                path: '/:id',
                Component: () => {
                        const { id } = useParams();
                        window.location.href = tinyUrlServer + id;
                        return null;
                }
        },
        {
                path: '/myURLs',
                element: <p>myURLS</p>
        },
        {
                path: '*',
                element: <h1>404 Not Found</h1>
        }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
                <NavBar />
                <RouterProvider router={router} />
        </React.StrictMode>
);
