import React from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "src/containers/LoginPage/LoginPage";
import Dashboard from "src/containers/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <div className="app background-black color-white flex flex-column align-items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
