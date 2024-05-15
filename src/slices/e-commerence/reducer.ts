import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductDetail,
  getCart,
  deleteCart,
  addProductToCart,
  createOrderOnServer,
  getMyOrdersPartial,
} from "./thunk";

import {
  BackendParams,
  EComShop,
  Product,
  ProductCustomer,
  ProductOrder,
  ProductPartialInfo,
  BackendProductDes,
  CartProduct,
  MyOrder,
} from "pages/Ecommerce/type";

interface InitialState {
  products?: Product[];
  productDetail?: Product[];
  orders?: ProductOrder[];
  customers?: ProductCustomer[];
  shops?: EComShop[];
  cart?: CartProduct[];
  error: object;
  loading?: boolean;

  productPartialInfo: ProductPartialInfo[];
  // productNameId: ProductNameId[];
  backendParams: BackendParams[];
  backendProductDes: BackendProductDes;
  myOrders: MyOrder[];
}

export const initialState: InitialState = {
  products: [],
  productDetail: [],
  orders: [],
  customers: [],
  shops: [],
  cart: [],
  error: {},
  loading: false,

  productPartialInfo: [],

  backendParams: [],
  backendProductDes: {} as BackendProductDes,
  myOrders: [],
};

const EcommerceSlice = createSlice({
  name: "EcommerceSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state: any, action: any) => {
      state.productPartialInfo = action.payload.products;
      state.backendParams = action.payload.params;
    });

    builder.addCase(getProducts.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getProductDetail.fulfilled, (state: any, action: any) => {
      state.backendParams = action.payload.params;
      state.backendProductDes = action.payload.product;
      state.backendProductDes.sample_count = action.payload.cartItems.length;
    });

    builder.addCase(getProductDetail.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getCart.fulfilled, (state: any, action: any) => {
      const formattedData = action.payload.data.map((eachSample) => {
        return {
          ...eachSample,
          parameters: eachSample.parameters.map((eachParam) => {
            return {
              ...eachParam,
              params: JSON.parse(eachParam.params),
            };
          }),
        };
      });

      state.cart = formattedData;
    });

    builder.addCase(getCart.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.backendProductDes = {
        ...state.backendProductDes,
        sample_count: state.backendProductDes.sample_count + 1,
      };

      const updatedParams = state.backendParams.map((each: BackendParams) => {
        return { ...each, selected: false };
      });

      state.backendParams = updatedParams;
    });

    builder.addCase(addProductToCart.rejected, (state: any, action: any) => {
      console.log("rejected");
      state.error = action.payload ? action.payload?.message : null;
    });

    builder.addCase(createOrderOnServer.fulfilled, (state, action) => {
      state.cart = [];
    });

    //cart
    builder.addCase(deleteCart.fulfilled, (state: any, action: any) => {
      state.cart = (state.cart || []).filter(
        (data: CartProduct) => data.sampleId !== action.payload.data
      );
    });

    builder.addCase(deleteCart.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getMyOrdersPartial.fulfilled, (state, action) => {
      state.myOrders = action.payload.data;
    });

    builder.addCase(getMyOrdersPartial.rejected, (state, action) => {
      console.log("Api Rejected");
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export default EcommerceSlice.reducer;
