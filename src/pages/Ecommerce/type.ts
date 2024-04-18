import { ModalType } from "slices/e-commerence/reducer";
export interface EcoAction {
  ecommerce: {
    products?: Product[];
    productDetail?: Product;
    orders?: ProductOrder[];
    customers?: ProductCustomer[];
    shops?: EComShop[];
    productComments?: any[];
    cart?: cart[];
    loading?: boolean;
    modal: ModalType;
    productPartialInfo: ProductPartialInfo[];
    productNameId: ProductNameId[];
  };
}

export interface FilterClothes {
  id: number;
  name: string;
  link: string;
}

export interface Discount {
  label: string;
  value: number;
}

export interface ProductNameId {
  name: string;
  id: string;
}

export interface ProductPartialInfo {
  id: number;
  image: string;
  name: string;
  offer: number | 0;
  isOffer: boolean;
  base_price: number;
  features: string[];
}

interface KeyValue {
  [key: string]: string;
}

export interface Product {
  id: number;
  image: string;
  image_lg: string;
  name: string;
  link: string;
  category: string;
  rating: number;
  prefix: string;
  completePack: boolean;

  basePrice: number;
  isOffer?: boolean;
  offer: number;
  reviews: number;

  params: Params[]; //test specifications (IS Code etc)

  recentProducts?: RecentProducts[];
  comments?: Comment[];
  additionalInfo: KeyValue[];
  description?: string;
}

export interface Tests {
  value: string; //id of the param
  label: string; //name of the parameter
  price: number;
  method: string;
  isNABL: Boolean;
  discipline: "CHEMICAL" | "PHYSICAL";
}
export interface Params {
  label: string;
  options: Tests[];
}

export interface Feature {
  icon: string;
  type: string;
  value: string;
}

export interface ColorOption {
  image: string;
  color: string;
}

export interface RecentProducts {
  id: number;
  img: string;
  name: string;
  link: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
}

export interface Comment {
  id: number;
  img: string;
  name: string;
  description: string;
  date: string;
  childComment?: Comment[];
}

export interface ProductOrder {
  id: number | string;
  orderId: string;
  billingName: string;
  orderDate: string;
  total: string;
  badgeClass: string;
  paymentStatus: string;
  methodIcon: string;
  paymentMethod: string;
}

export interface ProductCustomer {
  id: number;
  username: string;
  phone: string;
  email: string;
  address: string;
  rating: string;
  walletBalance: string;
  joiningDate: string;
}

export interface EComShop {
  id: number;
  color: string;
  name: string;
  product: number;
  balance: string;
  profileLink: string;
}

export interface cart {
  id: number;
  img: string;
  name: string;
  category: string;
  basePrice: number;
  isOffer: boolean;
  offer: number;
  cart_id: string;
}
