import { LocalKey } from "ts-localstorage";

export interface IProductsApi {
  _basketProductsKey: LocalKey<Array<number>>;

  getBasketProducts(): number[] | [];

  addProductToBasket(id: number): boolean;

  removeProductFromBasket(id: number): boolean;

  clearBasket(): void;
}
