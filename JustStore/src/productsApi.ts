import { LocalKey, LocalStorage } from "ts-localstorage";
import { DefaultProductImage } from "./constants/images";
import { products } from "./constants/products";
import { IProductsApi } from "./models/productsApi";
import { Product } from "./app/api";

export const api: IProductsApi = {
  _allProductsKey: new LocalKey("products", new Array<Product>()),
  _basketProductsKey: new LocalKey("basketProducts", new Array<number>()),

  async getProducts(): Promise<Product[] | []> {
    let allProducts = LocalStorage.getItem(this._allProductsKey);

    if (!allProducts) {
      LocalStorage.setItem(this._allProductsKey, products);
      return LocalStorage.getItem(this._allProductsKey)!;
    }

    return allProducts;
  },

  async getProduct(id: number): Promise<Product | null> {
    const products = LocalStorage.getItem(this._allProductsKey);

    if (!products) {
      return null;
    }

    const product = products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  },

  async createProduct({
    name,
    price,
    description,
    category,
    imageUrl = DefaultProductImage,
  }: Product): Promise<void> {
    let products: Product[] | null = LocalStorage.getItem(this._allProductsKey);
    let id: number;

    if (!products) {
      products = new Array<Product>();
      id = 1;
    } else {
      id =
        products.reduce((previousProduct, currentProduct) =>
          previousProduct.id < currentProduct.id
            ? currentProduct
            : previousProduct
        ).id + 1;
    }

    products.push({ id, name, description, category, price, imageUrl });

    LocalStorage.setItem(this._allProductsKey, products);
  },

  async updateProduct(id: number, newProduct: Product): Promise<boolean> {
    const products = LocalStorage.getItem(this._allProductsKey);

    if (!products) {
      return false;
    }

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return false;
    }

    products[index] = newProduct;
    LocalStorage.setItem(this._allProductsKey, products);

    return true;
  },

  async deleteProduct(id: number): Promise<Product | undefined> {
    const products = LocalStorage.getItem(this._allProductsKey);

    if (!products) {
      return undefined;
    }

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return undefined;
    }

    const product = products.splice(index, 1)[0];
    LocalStorage.setItem(this._allProductsKey, products);

    return product;
  },

  getBasketProducts(): Product[] | [] {
    const basketProductsIds = LocalStorage.getItem(this._basketProductsKey);
    const products = LocalStorage.getItem(this._allProductsKey);

    if (!basketProductsIds || !products) {
      return [];
    }

    return products.filter((product) => basketProductsIds.includes(product.id));
  },

  addProductToBasket(id: number): boolean {
    const products = LocalStorage.getItem(this._allProductsKey);
    let basketProducts = LocalStorage.getItem(this._basketProductsKey);

    if (!products) {
      return false;
    }

    if (!basketProducts) {
      basketProducts = new Array<number>();
    }

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return false;
    }

    basketProducts.push(products[index].id);
    LocalStorage.setItem(this._basketProductsKey, basketProducts);

    return true;
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

  getCategories(): string[] | [] {
    const products = LocalStorage.getItem(this._allProductsKey);
    const categories = Array.from(
      new Set(products?.map((product) => product.category))
    );

    return categories || [];
  },
};
