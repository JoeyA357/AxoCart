import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";

import pgFnf from "./components/error/pgFnf";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import ChatHome from "../src/components/chat/ChatHome";

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
  ];

  let routesElement = useRoutes(routesArray);
  

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );

  
}

export default App;
