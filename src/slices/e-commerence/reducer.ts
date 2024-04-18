import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductDetail,
  getOrders,
  deleteOrder,
  addNewOrder,
  updateOrder,
  getCustomers,
  getShops,
  deleteCustomer,
  updateCustomer,
  addNewCustomer,
  getCart,
  deleteCart,
  addProductToCart,
  getProductsNameId,
} from "./thunk";

import { productsData } from "common/data/ecommerce";

import {
  EComShop,
  Product,
  ProductCustomer,
  ProductOrder,
  cart,
  ProductPartialInfo,
} from "pages/Ecommerce/type";

export interface ModalType {
  isSuccessModal: boolean;
  modalStatus: boolean;
  modalHeading: string;
  modalDescription: string;
}

interface ProductNameId {
  name: string;
  id: string;
}

interface InitialState {
  products?: Product[];
  productDetail?: Product[];
  orders?: ProductOrder[];
  customers?: ProductCustomer[];
  shops?: EComShop[];
  cart?: cart[];
  error: object;
  loading?: boolean;
  modal: ModalType;
  productPartialInfo: ProductPartialInfo[];
  productNameId: ProductNameId[];
}

export const loginWarningModal: ModalType = {
  isSuccessModal: false,
  modalStatus: true,
  modalHeading: "Login Required",
  modalDescription:
    "To access this feature, please log in to your account. If you don't have an account yet, you can create a free account with KDM Engineers Group.",
};

export const initialState: InitialState = {
  products: [],
  productDetail: [],
  orders: [],
  customers: [],
  shops: [],
  cart: [],
  error: {},
  loading: true,
  modal: {} as ModalType,
  productPartialInfo: [],
  productNameId: [],
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
      console.log(action);
      state.productPartialInfo = action.payload.products;
      state.loading = true;
    });

    builder.addCase(getProducts.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getProductsNameId.fulfilled, (state: any, action: any) => {
      console.log(action);
      // state.productNameId = action.payload.products;
      // state.loading = true;
    });

    builder.addCase(getProductDetail.fulfilled, (state: any, action: any) => {
      state.productDetail = action.payload;
    });

    builder.addCase(getProductDetail.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.orders = action.payload;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
      state.loading = true;
    });

    builder.addCase(getOrders.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;
    });

    builder.addCase(addNewOrder.fulfilled, (state: any, action: any) => {
      state.orders.unshift(action.payload);
      state.isOrderCreated = true;
    });

    builder.addCase(addNewOrder.rejected, (state: any, action: any) => {
      state.error = action.payload || null;
    });

    builder.addCase(updateOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.map((order: any) =>
        order.id === action.payload.id ? { ...order, ...action.payload } : order
      );
    });

    builder.addCase(updateOrder.rejected, (state: any, action: any) => {
      state.error = action.payload || null;
    });

    builder.addCase(deleteOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.filter(
        (order: any) => order.id !== action.payload
      );
    });

    builder.addCase(deleteOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
      state.customers = action.payload;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
      state.loading = true;
    });

    builder.addCase(getCustomers.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state: any, action: any) => {
      state.customers.unshift(action.payload);
      state.isCustomerCreated = true;
    });
    builder.addCase(addNewCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.map((customer: any) =>
        customer.id === action.payload.id
          ? { ...customer, ...action.payload }
          : customer
      );
    });

    builder.addCase(updateCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload || null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.filter(
        (customer: any) => customer.id !== action.payload
      );
    });

    builder.addCase(deleteCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getShops.fulfilled, (state: any, action: any) => {
      state.shops = action.payload;
      state.loading = true;
    });

    builder.addCase(getShops.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getCart.fulfilled, (state: any, action: any) => {
      const { cartItems } = action.payload;

      // Map over the cartItems and find corresponding product data
      const updatedCartItems = cartItems.map((cartItem: any) => {
        const pd = productsData.find(
          (product: Product) => product.id === cartItem.product_id
        );

        // Filter only the required keys from productData
        const filteredProductData = {
          id: pd?.id,
          img: pd?.image,
          name: pd?.name,
          category: pd?.category,
          basePrice: pd?.basePrice,
          isOffer: pd?.isOffer || false,
          offer: pd?.offer || 0,
          cart_id: cartItem.cart_id,
        };

        return filteredProductData;
      });

      state.cart = [...updatedCartItems];
    });
    builder.addCase(getCart.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    //i defined them
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { product_id, cart_id } = action.payload.data.cartItem;
        //fetching product info from products array
        const addedCartItem = productsData.filter(
          (eachProduct) => eachProduct.id === product_id
        );

        const formattedCartItem: cart = {
          id: addedCartItem[0].id,
          img: addedCartItem[0].image,
          name: addedCartItem[0].name,
          category: addedCartItem[0].category,
          basePrice: addedCartItem[0].basePrice,
          isOffer: addedCartItem[0].isOffer || false,
          offer: addedCartItem[0].offer,
          cart_id: cart_id,
        };
        state.cart?.push(formattedCartItem);
      }
    });

    builder.addCase(addProductToCart.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.message : null;
    });

    //cart
    builder.addCase(deleteCart.fulfilled, (state: any, action: any) => {
      state.cart = (state.cart || []).filter(
        (data: any) => data.cart_id !== action.meta.arg
      );
    });
    builder.addCase(deleteCart.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
  },
});

export const { showModal, closeModal } = EcommerceSlice.actions;

export default EcommerceSlice.reducer;
