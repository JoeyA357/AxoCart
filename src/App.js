import Login from "./components/auth/login";
import Register from "./components/auth/register";
import "./style.scss";

import Header from "./components/header";
import Home from "./components/home";

import AddProducts from "./components/products/addProducts";

import pgFnf from "./components/error/pgFnf";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import ChatHome from "../src/components/chat/ChatHome";

import { ProductsContextProvider } from "./contexts/productContext";
import { CartContextProvider } from "./contexts/cartContext";
import Cart from "./components/cart/cart";
import SearchProducts from "./components/products/SearchProducts";
import Cashout from "./components/cashout/cashout";

function App() {
  
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/chat",
      element: <ChatHome />,
    },
    {
      path: "/addProducts",
      element: <AddProducts />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/cashout",
      element: <Cashout />
    },
    {
      path: "/searchProducts",
      element: <SearchProducts />
    }
  ];

  let routesElement = useRoutes(routesArray);
  

  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <AuthProvider>
          <Header />
          <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </AuthProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
