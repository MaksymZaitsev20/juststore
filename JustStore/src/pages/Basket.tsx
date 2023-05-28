import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import BasketProductCard from "../components/BasketProductCard";
import { api } from "../productsApi";
import { useGetAllProductsQuery } from "../api/productApi";
import { Product } from "../app/api";

const Basket = () => {
  const productIds: number[] = api.getBasketProducts();
  const { data: allProducts = [] } = useGetAllProductsQuery();
  let products: Product[];

  if (productIds.length) {
    products = allProducts.filter((product) => productIds.includes(product.id));
  } else {
    products = [];
  }

  const price = products
    .map((product) => product.price)
    .reduce((sum, price) => sum + price, 0);

  useAppSelector((state) => state.basket);

  return (
    <>
      <Stack minHeight="473px">
        {products.map((product, index) => {
          return (
            <BasketProductCard
              key={index}
              id={product.id}
              title={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          );
        })}
      </Stack>
      <Typography sx={{ textAlign: "right", margin: "20px" }}>
        Total price: {price} ₴
      </Typography>
    </>
  );
};

export default Basket;
