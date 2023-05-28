import { CategoryClient, ProductClient } from "./api";

const baseUrl = "https://localhost:44386";

export const productClient = new ProductClient(baseUrl);
export const categoryClient = new CategoryClient(baseUrl);
