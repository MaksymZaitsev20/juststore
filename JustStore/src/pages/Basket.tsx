import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import BasketProductCard from "../components/BasketProductCard";
import { IProduct } from "../models/Product";
import { api } from "../productsApi";

const Basket = () => {
  let products: IProduct[] | [] = api.getBasketProducts();
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
