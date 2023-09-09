import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { TrackerPage } from "./trackerComponents/TrackerPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Trackers/:name/:daysLeft/:currDay",
    element: <TrackerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>  
    <RouterProvider router={router} />
  </React.StrictMode>
);
