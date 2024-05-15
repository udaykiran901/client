import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getCustomersList,
  getGraphSubscribers,
  getRequestCallBacks,
  getSubscribers,
  onSubscribe,
  registerCustomer,
  uploadCustomerRequestAudio,
  getSubscribersLast30Records,
} from "./thunk";
import {
  CallBacks,
  Orders,
  Customer,
  Subscriber,
  CountGraph,
} from "pages/BD/types";

// import { RequestCallBackFormType } from "pages/BD/types";

interface InitialState {
  error: object;
  loading?: boolean;
  showSubscribeModal: boolean;
  callbacks: CallBacks[];
  orders: Orders[];
  customers: Customer[];
  subscribers: Subscriber[];
  subscribersGraph: CountGraph[];
  subscribersLast30Records: CountGraph[];
}

export const initialState: InitialState = {
  error: {},
  loading: false,
  showSubscribeModal: false,
  callbacks: [],
  orders: [],
  customers: [],
  subscribers: [],
  subscribersGraph: [],
  subscribersLast30Records: [],
};

const BDslice = createSlice({
  name: "BDslice",
  initialState,
  reducers: {
    toggleSubscribeModal(state) {
      return {
        ...state,
        showSubscribeModal: !state.showSubscribeModal,
      };
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   onRequestCallbackThunk.fulfilled,
    //   (state: any, action: any) => {
    //     // state.products = action.payload;
    //     // state.loading = true;
    //     console.log("request callback thunk is done");
    //     console.log(action);
    //   }
    // );
    // builder.addCase(
    //   onRequestCallbackThunk.rejected,
    //   (state: any, action: any) => {
    //     // state.error = action.payload ? action.payload?.error : null;
    //     console.log("request callback thunk is denied");
    //     console.log(action);
    //   }
    // );

    builder.addCase(onSubscribe.fulfilled, (state: any, action: any) => {
      state.showSubscribeModal = false;
    });

    builder.addCase(
      getRequestCallBacks.fulfilled,
      (state: any, action: any) => {
        state.callbacks = action.payload.data;
      }
    );

    builder.addCase(
      uploadCustomerRequestAudio.fulfilled,
      (state: any, action: any) => {
        state.callbacks = state.callbacks.map((eachCallBack: CallBacks) => {
          if (eachCallBack.request_id === action.payload.request_id) {
            return { ...eachCallBack, callrecording: action.payload.url };
          }
          return eachCallBack;
        });
      }
    );

    builder.addCase(getAllOrders.fulfilled, (state: any, action: any) => {
      state.orders = action.payload.data;
    });

    builder.addCase(getCustomersList.fulfilled, (state: any, action: any) => {
      state.customers = action.payload.data;
    });

    builder.addCase(registerCustomer.fulfilled, (state: any, action: any) => {
      state.customers = [action.payload.data, ...state.customers];
    });

    builder.addCase(getSubscribers.fulfilled, (state: any, action: any) => {
      state.subscribers = action.payload.data;
    });

    builder.addCase(
      getSubscribersLast30Records.fulfilled,
      (state: any, action: any) => {
        state.subscribersLast30Records = action.payload.data;
      }
    );

    builder.addCase(
      getGraphSubscribers.fulfilled,
      (state: any, action: any) => {
        state.subscribersGraph = action.payload.data;
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

export const { toggleSubscribeModal } = BDslice.actions;

export default BDslice.reducer;
