import { Orders, OrderSampleSelectedParams, Samples } from "pages/BD/types";
import { Employee } from "pages/HRandAdmin/types";

export interface LabAction {
  lab: {
    loading: true;
    error?: {};
    sampleAllocationPending: Orders[];
    labStaff: Employee[];
  };
}

interface Product {
  id: number;
  name: string;
  base_price: number;
}

interface Order {
  order_id: string;
  project_name: string;
  due_date: string;
}

interface Sample {
  sample_id: string;
  order_id: string;
  product_id: number;
  isOffer: boolean;
  job_assigned: boolean;
  offer: number;
  created_at: string;
  doa: string;
  source: string;
  quantity: string;
  grade: string;
  brandName: string;
  week_no: string;
  ref_code: string;
  sample_id_optional_field: string;
  sample_code: string;
  site_name: string;
  product: Product;
  order: Order;
}

interface Param {
  param_id: string;
  discipline: string;
}

export interface Job {
  param_pk: string;
  sample_id: string;
  param_id: string;
  params_info: OrderSampleSelectedParams[];
  finished: boolean;
  bench_record: string | null;
  report_values: string | null;
  param_price: number;
  status: string;
  analyst: string;
  sample: Sample;
  param: Param;
  employee: Employee;
}
