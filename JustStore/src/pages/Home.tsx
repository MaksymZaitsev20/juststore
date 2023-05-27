import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CatalogProductCard from "../components/CatalogProductCard";
import { api } from "../productsApi";
import SideBar from "../components/SideBar";
import { IProduct } from "../api/api";

const Home = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const products = await api.getProducts();
      const filteredProducts = products.filter(
        (product) => product.category === category
      );

      if (filteredProducts.length) {
        setProducts(filteredProducts);
      } else {
        setProducts(products!);
      }
    };

    fetchData();
  }, [category]);

  return (
    <Stack direction="row" minHeight="537px">
      <SideBar setCategory={setCategory} />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          padding: "20px",
        }}
      >
        {products?.map((product, index) => {
          return (
            <CatalogProductCard
              key={index}
              id={product.id}
              title={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          );
        })}
      </Container>
    </Stack>
  );
};

export default Home;
