import { IProduct } from "../models/Product";
import {
  AppleAirpods,
  AppleIpad,
  AppleIphone,
  CanonEos,
  GooglePixel,
  Oneplus,
  SamsungGalaxy,
} from "./images";

export const products: IProduct[] = [
  {
    id: 1,
    name: "Cell phone Google Pixel 7 Pro 12/512GB Snow",
    description: "",
    imageUrl: GooglePixel,
    price: 49587,
    category: "cell phone",
  },
  {
    id: 2,
    name: "Cell phone Samsung Galaxy S22 Ultra 12/1TB Phantom Black",
    description: "",
    imageUrl: SamsungGalaxy,
    price: 79130,
    category: "cell phone",
  },
  {
    id: 3,
    name: "Cell phone Apple iPhone 14 Pro Max 1TB Gold",
    description: "",
    imageUrl: AppleIphone,
    price: 84999,
    category: "cell phone",
  },
  {
    id: 4,
    name: "Cell phone OnePlus 10 Pro 8/128GB Black",
    description: "",
    imageUrl: Oneplus,
    price: 30086,
    category: "cell phone",
  },
  {
    id: 5,
    name: "Camera Canon EOS R 24-105 mm F4-7.1 IS STM Kit Black (3075C129AA)",
    description: "",
    imageUrl: CanonEos,
    price: 81099,
    category: "camera & photo",
  },
  {
    id: 6,
    name: "Tablet Apple iPad Pro 11 M2 Wi-Fi 1TB Space Gray",
    description: "",
    imageUrl: AppleIpad,
    price: 76999,
    category: "tablet",
  },
  {
    id: 7,
    name: "Earbuds Apple AirPods Pro with MagSafe Charging Case 2022 (2-nd generation)",
    description: "",
    imageUrl: AppleAirpods,
    price: 12699,
    category: "headphones & earbuds",
  },
];
