import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductDetail,
  getCart,
  deleteCart,
  addProductToCart,
  getMyOrdersPartial,
  paymentSuccessfull,
  onGetAllParams,
  generateMaterialTestingServiceQuote,
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
  addToCartLoading: boolean;
  allParams: BackendParams[];

  materialTestingQuotation: {
    mtqLoading: boolean;
    error: string;
    link: null;
  };
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
  addToCartLoading: false,
  allParams: [],

  materialTestingQuotation: {
    mtqLoading: false,
    error: "",
    link: null,
  },
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

    builder.addCase(onGetAllParams.fulfilled, (state: any, action: any) => {
      console.log("In reducer");
      state.allParams = action.payload.data;
    });

    builder.addCase(getProducts.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getProductDetail.fulfilled, (state: any, action: any) => {
      state.backendParams = action.payload.params;
      state.backendProductDes = action.payload.product;
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

    builder.addCase(addProductToCart.pending, (state, action) => {
      state.addToCartLoading = true;
      state.loading = false;
    });

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.backendProductDes = {
        ...state.backendProductDes,
      };

      const updatedParams = state.backendParams.map((each: BackendParams) => {
        return { ...each, selected: false };
      });

      state.backendParams = updatedParams;
      state.addToCartLoading = false;
    });

    builder.addCase(addProductToCart.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.message : null;
      state.addToCartLoading = false;
    });

    // builder.addCase(createOrderOnServer.fulfilled, (state, action) => {});

    builder.addCase(paymentSuccessfull.fulfilled, (state, action) => {
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

    //quotation
    builder.addCase(
      generateMaterialTestingServiceQuote.fulfilled,
      (state: any, action: any) => {
        state.materialTestingQuotation.mtqLoading = false;
        state.materialTestingQuotation.link = action.payload.link;
        state.materialTestingQuotation.error = action.payload.error;
      }
    );

    builder.addCase(
      generateMaterialTestingServiceQuote.pending,
      (state: any, action: any) => {
        state.materialTestingQuotation.mtqLoading = true;
        state.materialTestingQuotation.link = "";
        state.materialTestingQuotation.error = "";
      }
    );

    builder.addCase(
      generateMaterialTestingServiceQuote.rejected,
      (state: any, action: any) => {
        state.materialTestingQuotation.mtqLoading = false;
        state.materialTestingQuotation.error = "Error generating the quotation";
        //write for error case
      }
    );

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
