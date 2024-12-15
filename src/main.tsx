import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from "react-router-dom";
import MessageBox from "./Components/MessageBox";
import MessageBoxIntro from "./Components/MessageBoxIntro";
import MessageBoxSender from "./Components/MessageBoxSender";
import ProfilePage from "./Components/ProfilePage";
import MessagePage from "./Components/MessagePage";
import Signup from "./Components/Signup";
import { Provider } from "react-redux";
import ReduxStore from "./Components/ReduxStore/Store";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AllUsersShowPage from "./Components/AllUsersShowPage";
import AllUsers from "./Components/AllUsers";
import UsersBlockedPage from "./Components/UsersBlockedPage";
import ShowAllGroupsPage from "./Components/ShowAllGroupsPage";
import ShowProfilePage from "./Components/ShowProfilePage";

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
})

const routes: RouteObject[] = [
    {
        path: '/', element: <App />, children: [
            {
                path: '/', element: <MessagePage />, children: [
                    {path: '/', element: <MessageBoxIntro />},
                    {path: '/:id', element: <MessageBoxSender />},
                ],
            },
            {path: '/users', element: <AllUsersShowPage />, children: [
                {path: '/users', element: <AllUsers />},
                {path: '/users/blocked', element: <UsersBlockedPage />},
            ]},
            {path: '/groups', element: <ShowAllGroupsPage />},
            {path: '/profile', element: <ShowProfilePage />},
        ]
    },
    {
        path: '/signup', element: <Signup />,
    }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={ReduxStore}>
            <ApolloProvider client={client}>
                <RouterProvider router={router}>
                    <Outlet />
                </RouterProvider>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);
