import {
  AppleAirpodsImage,
  AppleIpadImage,
  AppleIphoneImage,
  CanonEosImage,
  GooglePixelImage,
  OneplusImage,
  SamsungGalaxyImage,
} from "./images";
import { IProduct } from "../app/api";

export const products: IProduct[] = [
  {
    id: 1,
    name: "Cell phone Google Pixel 7 Pro 12/512GB Snow",
    description: "",
    imageUrl: GooglePixelImage,
    price: 49587,
    category: "cell phone",
  },
  {
    id: 2,
    name: "Cell phone Samsung Galaxy S22 Ultra 12/1TB Phantom Black",
    description: "",
    imageUrl: SamsungGalaxyImage,
    price: 79130,
    category: "cell phone",
  },
  {
    id: 3,
    name: "Cell phone Apple iPhone 14 Pro Max 1TB Gold",
    description: "",
    imageUrl: AppleIphoneImage,
    price: 84999,
    category: "cell phone",
  },
  {
    id: 4,
    name: "Cell phone OnePlus 10 Pro 8/128GB Black",
    description: "",
    imageUrl: OneplusImage,
    price: 30086,
    category: "cell phone",
  },
  {
    id: 5,
    name: "Camera Canon EOS R 24-105 mm F4-7.1 IS STM Kit Black (3075C129AA)",
    description: "",
    imageUrl: CanonEosImage,
    price: 81099,
    category: "camera & photo",
  },
  {
    id: 6,
    name: "Tablet Apple iPad Pro 11 M2 Wi-Fi 1TB Space Gray",
    description: "",
    imageUrl: AppleIpadImage,
    price: 76999,
    category: "tablet",
  },
  {
    id: 7,
    name: "Earbuds Apple AirPods Pro with MagSafe Charging Case 2022 (2-nd generation)",
    description: "",
    imageUrl: AppleAirpodsImage,
    price: 12699,
    category: "headphones & earbuds",
  },
];
