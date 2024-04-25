import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductDetail,
  getCart,
  deleteCart,
  addProductToCart,
  createOrderOnServer,
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
} from "pages/Ecommerce/type";

export interface ModalType {
  isSuccessModal: boolean;
  modalStatus: boolean;
  modalHeading: string;
  modalDescription: string;
}

export interface BackendProductInfo {}

interface InitialState {
  products?: Product[];
  productDetail?: Product[];
  orders?: ProductOrder[];
  customers?: ProductCustomer[];
  shops?: EComShop[];
  cart?: CartProduct[];
  error: object;
  loading?: boolean;
  modal: ModalType;
  productPartialInfo: ProductPartialInfo[];
  // productNameId: ProductNameId[];
  backendParams: BackendParams[];
  backendProductDes: BackendProductDes;
}

export const loginWarningModal: ModalType = {
  isSuccessModal: false,
  modalStatus: true,
  modalHeading: "Login Required",
  modalDescription:
    "To access this feature, please log in to your account. If you don't have an account yet, you can create a free account with KDM Engineers Group.",
};

export const addToCartWarningModal: ModalType = {
  isSuccessModal: false,
  modalStatus: true,
  modalHeading: "No Product Selected",
  modalDescription:
    "To add a product to your cart, please select at least one product. Browse our collection and choose the items you'd like to purchase.",
};

export const initialState: InitialState = {
  products: [],
  productDetail: [],
  orders: [],
  customers: [],
  shops: [],
  cart: [],
  error: {},
  loading: false,
  modal: {} as ModalType,
  productPartialInfo: [],

  backendParams: [],
  backendProductDes: {} as BackendProductDes,
};

const EcommerceSlice = createSlice({
  name: "EcommerceSlice",
  initialState,
  reducers: {
    showModal(state, action) {
      const { isSuccessModal, modalStatus, modalHeading, modalDescription } =
        action.payload;

      return {
        ...state,
        modal: {
          ...state.modal,
          isSuccessModal,
          modalStatus,
          modalHeading,
          modalDescription,
        },
      };
    },
    closeModal(state) {
      state.modal.isSuccessModal = false;
      state.modal.modalStatus = false;
      state.modal.modalHeading = "";
      state.modal.modalDescription = "";
    },
  },

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
      console.log("createOrderOnServer is fullfilled");
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

export const { showModal, closeModal } = EcommerceSlice.actions;

export default EcommerceSlice.reducer;
