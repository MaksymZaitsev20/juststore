import { LocalKey } from "ts-localstorage";
import { IProduct } from "../app/api";

export interface IProductsApi {
  _allProductsKey: LocalKey<Array<IProduct>>;
  _basketProductsKey: LocalKey<Array<number>>;

  getProducts(): Promise<IProduct[] | []>;

  getProduct(id: number): Promise<IProduct | null>;

  createProduct(
    name: string,
    price: number,
    description: string,
    category: string,
    imageUrl: string
  ): Promise<void>;

  updateProduct(id: number, newProduct: IProduct): Promise<boolean>;

  deleteProduct(id: number): Promise<IProduct | undefined>;

  getBasketProducts(): IProduct[] | [];

  addProductToBasket(id: number): boolean;

  removeProductFromBasket(id: number): boolean;

  clearBasket(): void;

  getCategories(): string[] | [];
}
