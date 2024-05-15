export interface RequestCallBackFormType {
  name: string;
  mobile: string;
  whatsapp: boolean;
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
  };
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

export interface Orders {
  placedOn: string;
  order_id: string;
  samplesList: OrderSamples[];
  samples_received: boolean;
  driver_assigned: boolean;
  proforma_issued: boolean;
  project_name: string;
  subject: string;
  parent_ref: string;
  nhai_hq_letter: string;
  additional_info: string;
  letter: string;
  due_date: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  customerData: OrderCustomerInfo;
  samples_collection_address: string;
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
