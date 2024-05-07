import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Production from './pages/Production/Production.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx'
import AccountDeleting from './pages/AccountDeleting/AccountDeleting.jsx'
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
import ListOrders from './Components/ListOrders/ListOrders.jsx'
import ListUser from './Components/ListUser/ListUser.jsx'
import UserContext from './Context/UserContext.jsx'
import ListCategory from './Components/ListCategory/ListCategory.jsx'
import ProductionMore from './pages/ProductionMore/ProductionMore.jsx'
import SettingsSite from './Components/SettingsSite/SettingsSite.jsx'
import BonusAccount from './Components/BonusAccount/BonusAccount.jsx'
import WantToTry from './Components/WantToTry/WantToTry.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import SuccessfulOrder from './pages/SuccessfulOrder/SuccessfulOrder.jsx'

//import { store } from './app/store'
import { Provider } from 'react-redux'


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
        path: "account-deleting",
        element: <AccountDeleting />,
      },
      {
        path: "products/:name/:id",
        element: <ProductionMore />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "successful-order",
        element: <SuccessfulOrder />,
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
            path: "list-orders",
            element: <ListOrders />,
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
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "personal-area",
        element: <PersonalArea />,
        children: [
          {
            path: "my-data",
            element: <MyData />,
          },
          {
            path: "history-of-orders",
            element: <HistoryOfOrders />,
          },
          {
            path: "bonus-account",
            element: <BonusAccount />,
          },
          {
            path: "want-to-try",
            element: <WantToTry />,
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<Provider store={store}>
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>
  //</Provider>

);



//my-data
