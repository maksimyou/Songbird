import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Production from './pages/Production/Production.jsx'
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx'
import PersonalArea from './pages/PersonalArea/PersonalArea.jsx'
import Favorites from './pages/Favorites/Favorites.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import BasketOfGoods from './pages/BasketOfGoods/BasketOfGoods.jsx'
import AddingCategory from './Components/AddingCategory/AddingCategory.jsx'
import Main from './pages/Main/Main'
import MyData from './Components/MyData/MyData.jsx'
import HistoryOfOrders from './Components/HistoryOfOrders/HistoryOfOrders.jsx'
import AddingGoods from './Components/AddingGoods/AddingGoods.jsx'
import ListGoods from './Components/ListGoods/ListGoods.jsx'
import ListUser from './Components/ListUser/ListUser.jsx'
import UserContext from './Context/UserContext.jsx'
import ListCategory from './Components/ListCategory/ListCategory.jsx'
import ProductionMore from './pages/ProductionMore/ProductionMore.jsx'
import SettingsSite from './Components/SettingsSite/SettingsSite.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "products",
        element: <Production />,
      },
      {
        path: "products/:name/:id",
        element: <ProductionMore />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
        children: [
          {
            path: "list-user",
            element: <ListUser />,
          },
          {
            path: "settings-site",
            element: <SettingsSite />,
          },

          {
            path: "adding-goods",
            element: <AddingGoods />,
          },

          {
            path: "list-goods",
            element: <ListGoods />,
          },
          {
            path: "adding-category",
            element: <AddingCategory />,
          },
          {
            path: "list-category",
            element: <ListCategory />,
          },


        ]
      },
      {
        path: "products/:name",
        element: <Production />,
      },
      {
        path: "basket-of-goods",
        element: <BasketOfGoods />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "personal-area",
        element: <PersonalArea />,
        children: [
          {
            path: "",
            element: <MyData />,
          },
          {
            path: "history-of-orders",
            element: <HistoryOfOrders />,
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>
);



//my-data
