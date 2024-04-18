import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getRoles as getRolesApi,
  getBranches as getBranchesApi,
  getEmployees as getEmployeesApi,
  getDepartments as getDepartmentsApi,
  getAccessKeys as getAccessKeysApi,
  onRegisteringNewEmployee as onRegisteringNewEmployeeApi,
} from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  GET_EMPLOYEES,
  GET_ROLES,
  GET_ACCESS_KEYS,
  GET_DEPARTMENTS,
  GET_BRANCHES,
  REGISTER_NEW_EMPLOYEE,
} from "../../helpers/url_helper";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const getProductDetail = createAsyncThunk(
//   "ecommerence/getProductDetail",
//   async (productId: any) => {
//     try {
//       const response = await getProductDetailApi(productId);
//       return response.data;
//     } catch (error) {
//       return error;
//     }
//   }
// );

export const getRoles = createAsyncThunk(GET_ROLES, async () => {
  try {
    const response = await getRolesApi();
    return response.data.roles;
  } catch (error) {
    return error;
  }
});

export const getBranches = createAsyncThunk(GET_BRANCHES, async () => {
  try {
    const response = await getBranchesApi();
    return response.data.branches;
  } catch (error) {
    return error;
  }
});

export const getEmployees = createAsyncThunk(GET_EMPLOYEES, async () => {
  try {
    const response = await getEmployeesApi();
    return response.data.employees;
  } catch (error) {
    return error;
  }
});

export const getDepartments = createAsyncThunk(GET_DEPARTMENTS, async () => {
  try {
    const response = await getDepartmentsApi();

    return response.data.departments;
  } catch (error) {
    return error;
  }
});

export const getAccessKeys = createAsyncThunk(GET_ACCESS_KEYS, async () => {
  try {
    const response = await getAccessKeysApi();
    return response.data.accessKeys;
  } catch (error) {
    return error;
  }
});

export const onRegisterEmployee = createAsyncThunk(
  REGISTER_NEW_EMPLOYEE,
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await onRegisteringNewEmployeeApi(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });

      const navigate = useNavigate();
      navigate("/hr/emp - list");

      return response.data;
    } catch (error: any) {
      toast.error(
        error.data.message
          ? error.data.message
          : "Something went wrong, please try again later",
        {
          autoClose: 10000,
        }
      );
      throw error;
      // return error;
    }
  }
);
