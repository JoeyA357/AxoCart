import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";

import AddProducts from "./components/products/addProducts";

import pgFnf from "./components/error/pgFnf";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

import { ProductsContextProvider } from "./contexts/productContext";
import { CartContextProvider } from "./contexts/cartContext";
import Cart from "./components/cart/cart";

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
      path: "/addProducts",
      element: <AddProducts />,
    },
    {
      path: "/cart",
      element: <Cart />
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
