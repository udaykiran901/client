export interface RequestCallBackFormType {
  name: string;
  mobile: string;
  whatsapp: boolean;
}

export interface Quotation {
  qtn_id: string;
  location: string;
  created_at: string;
  proforma_name: string;
  contact: string;
  email: string;
  created_by: string;
}

export interface EcoActionBD {
  bd: {
    callbacks: [];
    loading: true;
    error?: {};
    orders: [];
    customers: [];
    subscribers: [];
    subscribersGraph: [];
    subscribersLast30Records: [];
    showCallbackForm: false;
    showOrderAdditionalInfoModal: false;
    step2loader: false;
    customersLast30Recs: [];
    customersMonthlyRec: [];
    ordersDaily: [];
    ordersMonthly: [];
    samplesGraph: [];
    disciplineGraph: [];
    siteUsers: [];
    onlineUsersDaily: [];
    onlineUsersMonthly: [];
    onlineUsers: [];
    top10OrderdAccounts: [];
    dailyCountAllEntities: [];
    MonthlyAllEntities: [];
    orderInfo: {};
    branches: [];
    quotations: [];
    quotationsDaily: [];
    quotationsMonthly: [];

    allOrderSamples: [];
  };
}

export interface Branch {
  branch_id: string;
  branch: string;
  address: string;
}

export interface DailyGraphAllTntities {
  label: string;
  orders: number;
  subscribers: number;
  callBacks: number;
  users: number;
  customers: number;
}

export interface CallBacks {
  request_id: string;
  name: string;
  mobile: string;
  requested_at: string;
  whatsapp_consent: boolean;
  callrecording: null | string;
  addressed: boolean;
  close_query: boolean;
  additional_info: null | string;
}

//Orders List
export interface OrderSampleSelectedParams {
  test_id: string;
  testName: string;
  method: string;
  requirement: string;
}

export interface OrderSampleParams {
  param_id: string | number;
  orderedPrice: number;
  selectedParams: OrderSampleSelectedParams[];
}

export interface OrderSamples {
  sample_id: string;
  product_id: number;
  isOffer: boolean;
  offer: number;
  chemicalParams: OrderSampleParams[];
  physicalParams: OrderSampleParams[];
  params: OrderSampleParams[];
  name: string;
  image: string;

  brandName: string;
  created_at: string;
  grade: string;
  quantity: string;
  ref_code: string;
  sample_id_optional_field: string;
  source: string;
  week_no: string;
}

export interface OrderCustomerInfo {
  customer_id: string;
  name: string;
  address: string;
  pan_number: string;
  gst_number: string;
  created_at: string;
  contact: number;
  email: string;
}

//for listing all the orders screen
export interface Orders {
  created_at: string;
  order_id: string;
  samplesList?: OrderSamples[];
  samples_received?: boolean;
  driver_assigned?: boolean;
  proforma_issued?: boolean;
  project_name?: string;
  subject?: string;
  parent_ref?: string;
  nhai_hq_letter?: string;
  additional_info?: string;
  client_letter?: string;
  due_date?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  customerData?: OrderCustomerInfo;
  samples_collection_address?: string;
  registration_done: boolean;
  lab: string;
  ref?: string;
  mode?: string;
  proforma?: string;
  order_number: number;
  nhai_bool: boolean;
  parent_ref_bool: boolean;
  discount: number;
  transportation_fee: number;
  customer_id: string;

  converted_to_tax: boolean;
  tax_invoice: string;
  tax_number: number;
  tax_converted_date: string;

  samples: Samples[];
  scope: Product[];
}

export interface Samples {
  sample_id: string;
  product_id: number;
  source: string;
  quantity: string;
  grade: string;
  brandName: string;
  week_no: string;
  ref_code: string;
  sample_id_optional_field: string;
  sample_code: string;
  site_name: string;
  params: Param[];
  product: Product;
  job_assigned: boolean;
  doa: string;
}

export interface Param {
  sample_id: string;
  param_id: string;
  params_info: OrderSampleSelectedParams[];
  status: string;
  param: {
    discipline: string;
  };
  employee: {
    emp_id: string;
    username: string;
    profile_photo: string;
  };
}

interface Feature {
  short_feature: string;
  description: string;
}

export interface Parameter {
  param_id: string;
  is_nabl: boolean;
  common_req: boolean;
  popular: number;
  price: number;
  subgroup: number;
  params: OrderSampleSelectedParams[];
  available: boolean;
  additional_info: string;
  discipline: string;
  requirements: string;
}

export interface Product {
  id: number;
  image: string;
  image_lg: string;
  name: string;
  category: string;
  rating: number | null;
  base_price: number;
  isOffer: boolean;
  offer: number;
  prefix: string;
  complete_pack: boolean;
  description: string;
  no_of_days: number;
  interim_report: boolean;
  interim_report_days: number;
  features: Feature[];
  params: Parameter[];
}

export interface Customer {
  customer_id: string;
  name: string;
  address: string;
  pan_number: string;
  gst_number: string;
  created_at: string;
  contact: string;
  email: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface CountGraph {
  label: string;
  count: number;
}

export interface SamplesGraph {
  name: string;
  image: string;
  count: number;
}

export interface SiteUser {
  id: string;
  email: string;
  mobile: string;
  registeredDate: string;
}
