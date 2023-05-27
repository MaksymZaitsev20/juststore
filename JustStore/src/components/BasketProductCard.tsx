import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { removeFromBasket } from "../app/Basket";
import { DefaultProduct } from "../constants/images";

interface IProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

const BasketProductCard: FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();

  const handleOnRemoveClick = () => {
    dispatch(removeFromBasket(props.id));
  };

  return (
    <Card
      sx={{ height: "200px", display: "flex", alignContent: "space-between" }}
    >
      <CardActionArea sx={{ display: "flex", justifyContent: "space-around" }}>
        <CardMedia
          component="img"
          height="170"
          src={props.imageUrl}
          alt={props.title}
          onError={(event) => (event.currentTarget.src = DefaultProduct)}
          sx={{
            objectFit: "contain",
            width: "150px",
          }}
        />
        <CardContent
          sx={{
            width: "50%",
            display: "flex",
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
        <Button
          size="small"
          color="primary"
          onClick={handleOnRemoveClick}
          variant="outlined"
        >
          Remove from cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default BasketProductCard;
