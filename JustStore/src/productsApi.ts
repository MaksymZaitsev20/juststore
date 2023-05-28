import { LocalKey, LocalStorage } from "ts-localstorage";
import { IProductsApi } from "./models/productsApi";

export const api: IProductsApi = {
  _basketProductsKey: new LocalKey("basketProducts", new Array<number>()),

  getBasketProducts(): number[] | [] {
    const basketProductsIds = LocalStorage.getItem(this._basketProductsKey);

    if (!basketProductsIds) {
      return [];
    }

    return basketProductsIds;
  },

  addProductToBasket(id: number): boolean {
    let basketProducts = LocalStorage.getItem(this._basketProductsKey);

    if (!basketProducts) {
      basketProducts = new Array<number>();
    }

    const index = basketProducts.findIndex((currentId) => currentId === id);

    if (index === -1) {
      basketProducts.push(id);
      LocalStorage.setItem(this._basketProductsKey, basketProducts);

      return true;
    }

    return false;
  },

  removeProductFromBasket(id: number): boolean {
    const productIds = LocalStorage.getItem(this._basketProductsKey);

    if (!productIds) {
      return false;
    }

    const index = productIds.findIndex((productId) => productId === id);

    if (index === -1) {
      return false;
    }

    productIds.splice(index, 1);
    LocalStorage.setItem(this._basketProductsKey, productIds);

    return true;
  },

  async clearBasket(): Promise<void> {
    LocalStorage.removeItem(this._basketProductsKey);
  },
};
