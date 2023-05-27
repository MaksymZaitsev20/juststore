import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToBasket, removeFromBasket } from "../app/Basket";
import { DefaultProduct } from "../constants/images";

interface IProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

const CatalogProductCard: FC<IProps> = (props: IProps) => {
  const isAdded = useAppSelector(
    (state) =>
      !state.basket.products.some((productId) => productId === props.id)
  );

  const [showAddButton, setShowAddButton] = useState<boolean>(isAdded);

  useEffect(() => {
    setShowAddButton(isAdded);
  }, [isAdded]);

  const dispatch = useAppDispatch();

  const handleOnAddClick = () => {
    setShowAddButton(false);

    dispatch(addToBasket(props.id));
  };

  const handleOnRemoveClick = () => {
    setShowAddButton(true);

    dispatch(removeFromBasket(props.id));
  };

  return (
    <Card sx={{ width: "250px", height: "460px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170px"
          src={props.imageUrl}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
            (event.currentTarget.src = DefaultProduct)
          }
          alt={props.title}
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent
          sx={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.price} ₴
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {showAddButton ? (
          <Button
            size="small"
            color="primary"
            onClick={handleOnAddClick}
            variant="contained"
          >
            Add to cart
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={handleOnRemoveClick}
            variant="outlined"
          >
            Remove from cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CatalogProductCard;
