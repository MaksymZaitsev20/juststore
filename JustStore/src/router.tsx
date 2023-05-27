import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import ProductForm from "./pages/ProductForm";
import { PageNotFound } from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/add",
        element: <ProductForm />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
