import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LogListPage from "@/pages/Log/List";
import LogListDetailPage from "@/pages/Log/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
      </div>
    ),
  },
  {
    path: "log",
    element: <LogListPage/>,
  },
  {
    path: "log/detail",
    element: <LogListDetailPage/>,
  },
]);

export {
  RouterProvider,
  router,
}
