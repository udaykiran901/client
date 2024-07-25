import { Product } from "pages/BD/types";
export interface EcoAction {
  ecommerce: {
    products?: Product[];
    productDetail?: Product;
    orders?: ProductOrder[];
    customers?: ProductCustomer[];
    shops?: EComShop[];
    productComments?: any[];
    cart?: CartProduct[];
    loading?: boolean;

    productPartialInfo: ProductPartialInfo[];
    productNameId: ProductNameId[];
    backendParams: BackendParams[];
    backendProductDes: BackendProductDes;
    myOrders: MyOrder[];
    step2loader: boolean;
    addToCartLoading: false;
    allParams: [];

    materialTestingQuotation: {
      mtqLoading: false;
      error: "";
      link: null;
      quotation_generated: false;
    };
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
  prefix: string;
}

interface KeyValue {
  [key: string]: string;
}

export interface BackendParams {
  paramId: string;
  price?: number;
  common_req?: boolean;
  requirement?: string;
  isNabl?: boolean;
  discipline?: string;
  params?: string;
  selected?: boolean;
  subgroup?: number;
  popular?: boolean;
}

export interface BackendProductDes {
  id: number;
  name: string;
  category: string;
  base_price: number;
  isOffer: boolean;
  offer: number;
  prefix: string;
  complete_pack: boolean;
  description: string;
  no_of_days: number;
  interim_report: boolean;
  interim_report_days: number;
  image: string;
  image_lg: string;
  features: string;
  rating: number | null;
}

export interface Tests {
  value: string;
  label: string;
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

export interface offerDetails {
  isOffer: boolean;
  offerPercentage: number;
}

//cart

export interface CartProductParameter {
  param_id: string;
  is_nabl: boolean;
  common_req: boolean;
  price: number;
  subgroup: number;
  params: TestParams[];
  available: boolean;
  additional_info: string;
  discipline: string;
  requirements: string;
}

export interface TestParams {
  test_id: string;
  testName: string;
  method: string;
  requirement: string;
}

export interface CartProduct {
  sampleId: string;
  productId: number;
  productName: string;
  productCategory: string;
  img: string;
  isOffer: boolean;
  offer: number;
  parameters: CartProductParameter[];
}

//My orders
export interface MySelectedParam {
  test_id: string;
  testName: string;
  method: string;
  requirement: string;
}

export interface MyParam {
  param_id: string | number;
  orderedPrice: number;
  selectedParams: MySelectedParam[];
}

export interface MySamples {
  sample_id: string;
  product_id: number;
  isOffer: boolean;
  offer: number;
  chemicalParams: MyParam[];
  physicalParams: MyParam[];
  name: string;
  image: string;
}

export interface MyOrder {
  placedOn: string;
  order_id: string;
  due_date: string | null;
  samplesList: MySamples[];
}
