import { Button, Container, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../productsApi";

interface IFormInput {
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductForm = () => {
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      imageUrl: ""
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (product: IFormInput) => {
    await api.createProduct(product.name, product.category.toLowerCase(), product.price, product.imageUrl);

    alert("Product was added successfully!");
    reset();
    navigate("/");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          height="537px"
          whiteSpace="unset"
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: "Name is missed!" },
              minLength: {
                value: 10,
                message: "Min name length is 10 characters!",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                label="Name"
                variant="standard"
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{
              required: { value: true, message: "Category is missed!" },
              minLength: {
                value: 5,
                message: "Min category length is 5 characters!",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                label="Category"
                variant="standard"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: "Description is missed!" },
              minLength: {
                value: 20,
                message: "Min description length is 20 characters!",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                label="Description"
                multiline
                rows={4}
                variant="standard"
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: { value: true, message: "Price is missed!" },
              min: { value: 1, message: "Value should be at least 1" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                label="Price"
                variant="standard"
                type={"number"}
              />
            )}
          />
          <Controller
            name="imageUrl"
            control={control}
            rules={{
              required: { value: true, message: "Image URL is missed!" },
              minLength: {
                value: 10,
                message: "Min URL length is 10 characters!",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                label="Image URL"
                variant="standard"
              />
            )}
          />
          <Button type="submit" variant="contained">
            Add product
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ProductForm;
