import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CatalogProductCard from "../components/CatalogProductCard";
import SideBar from "../components/SideBar";
import { Product } from "../app/api";
import { useGetAllProductsQuery } from "../api/productApi";

const Home = () => {
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[] | []>([]);
  const { data: allProducts = [] } = useGetAllProductsQuery();

  useEffect(() => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );

    if (filteredProducts.length) {
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts!);
    }
  }, [category, allProducts]);

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
