export interface Branch {
  branch_id: string;
  branch: string;
  address?: string | null;
}

export interface Department {
  dept_id: string;
  department: string;
  additional_info?: string | null;
}

export interface Employee {
  emp_id: string;
  first_name: string;
  last_name: string;
  branch?: Branch | null;
  reporting_manager?: string | null;
  profile_pic?: string | null;
  department?: Department | null;
  username: string;
  hashed_password?: string | null;
  role?: Role | null;
  access_key?: AccessKey | null;
}

export interface Role {
  role_id: number;
  role: string;
  responsibilities?: string | null;
  min_salary?: number | null;
  department: string;
}

export interface AccessKey {
  access_id: string;
  label: string;
  description?: string | null;
  added_at: Date;
}

export interface EcoActionHRandAdmin {
  hrAndAdmin: {
    employees?: [];
    roles?: [];
    departments?: [];
    branches?: [];
    accessKeys?: [];
    loading: true;
    error?: {};
  };
}
