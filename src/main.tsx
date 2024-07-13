import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./constants/constants.ts";

import Start from "./pages/Start.tsx";
import Main from "./pages/Main.tsx";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Start />,
    path: ROUTES.START,
  },
  {
    element: <Main />,
    path: ROUTES.MAIN,
  },
  // {
  //   element: <ArtDetails />,
  //   path: `${ROUTES.ART}/:artId`,
  // },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
