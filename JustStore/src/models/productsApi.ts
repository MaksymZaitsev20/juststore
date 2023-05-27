import { LocalKey } from "ts-localstorage";
import { Product } from "../app/api";
import { DefaultProductImage } from "../constants/images";

export interface IProductsApi {
  _allProductsKey: LocalKey<Array<Product>>;
  _basketProductsKey: LocalKey<Array<number>>;

  getProducts(): Promise<Product[] | []>;

  getProduct(id: number): Promise<Product | null>;

  createProduct({
    id = 0,
    name,
    price,
    description,
    category,
    imageUrl = DefaultProductImage,
  }: Product): Promise<void>;

  updateProduct(id: number, newProduct: Product): Promise<boolean>;

  deleteProduct(id: number): Promise<Product | undefined>;

  getBasketProducts(): Product[] | [];

  addProductToBasket(id: number): boolean;

  removeProductFromBasket(id: number): boolean;

  clearBasket(): void;

  getCategories(): string[] | [];
}
