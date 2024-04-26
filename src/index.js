import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Privacy_policy from "./pages/Privacy_policy";
import Youtube from "./pages/Youtube";
import Causes from "./pages/Causes";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Youtube",
        element: <Youtube />,
      },

      {
        path: "/Donate",
        element: <Donate />,
      },
      {
        path: "/Privacy_policy",
        element: <Privacy_policy />,
      },
      {
        path: "/Gallery",
        element: <Gallery />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Causes",
        element: <Causes />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);