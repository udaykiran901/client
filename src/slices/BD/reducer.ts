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
  onRequestCallbackThunk,
  getCustomersMonthlyCount,
  getCustomersLast30records,
  getOrdersMonthlyRecord,
  getOrdersDailyRecord,
  getSamplesStatistics,
  getDisciplineGraph,
  getOnlineUsers,
  getDailyOnlineUsersCount,
  getMonthlyUsersOnlineCount,
  getTop10OrderedAccount,
  getDailyCountOfAllEntities,
  getCountOfAllEntitiesMonthly,
  getCompleteOrderDetails,
} from "./thunk";
import {
  CallBacks,
  Orders,
  Customer,
  Subscriber,
  CountGraph,
  SamplesGraph,
  SiteUser,
  DailyGraphAllTntities,
} from "pages/BD/types";
import { completeRegistration } from "slices/thunk";

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
  showCallbackForm: boolean;

  step2loader: boolean;
  customersLast30Recs: CountGraph[];
  customersMonthlyRec: CountGraph[];
  ordersDaily: CountGraph[];
  ordersMonthly: CountGraph[];
  samplesGraph: SamplesGraph[];
  disciplineGraph: [];
  siteUsers: SiteUser[];
  top10OrderdAccounts: CountGraph[];
  dailyCountAllEntities: DailyGraphAllTntities[];
  MonthlyAllEntities: DailyGraphAllTntities[];
  orderInfo: Orders;
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
  showCallbackForm: false,

  step2loader: false,
  customersLast30Recs: [],
  customersMonthlyRec: [],
  ordersDaily: [],
  ordersMonthly: [],
  samplesGraph: [],
  disciplineGraph: [],
  siteUsers: [],
  top10OrderdAccounts: [],
  dailyCountAllEntities: [],
  MonthlyAllEntities: [],
  orderInfo: {} as Orders,
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

    toggleCallbackForm(state) {
      return {
        ...state,
        showCallbackForm: !state.showCallbackForm,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      onRequestCallbackThunk.fulfilled,
      (state: any, action: any) => {
        state.showCallbackForm = !state.showCallbackForm;
      }
    );

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

    //Graphs
    builder.addCase(
      getSubscribersLast30Records.fulfilled,
      (state: any, action: any) => {
        state.subscribersLast30Records = action.payload.data;
      }
    );

    builder.addCase(
      getCustomersMonthlyCount.fulfilled,
      (state: any, action: any) => {
        state.customersMonthlyRec = action.payload.data;
      }
    );

    builder.addCase(
      getCustomersLast30records.fulfilled,
      (state: any, action: any) => {
        state.customersLast30Recs = action.payload.data;
      }
    );

    builder.addCase(
      getOrdersMonthlyRecord.fulfilled,
      (state: any, action: any) => {
        state.ordersMonthly = action.payload.data;
      }
    );

    builder.addCase(
      getOrdersDailyRecord.fulfilled,
      (state: any, action: any) => {
        state.ordersDaily = action.payload.data;
      }
    );

    builder.addCase(
      getSamplesStatistics.fulfilled,
      (state: any, action: any) => {
        state.samplesGraph = action.payload.data;
      }
    );

    builder.addCase(getDisciplineGraph.fulfilled, (state: any, action: any) => {
      state.disciplineGraph = action.payload.data;
    });

    builder.addCase(
      getDailyCountOfAllEntities.fulfilled,
      (state: any, action: any) => {
        state.dailyCountAllEntities = action.payload.data;
      }
    );

    builder.addCase(
      getCountOfAllEntitiesMonthly.fulfilled,
      (state: any, action: any) => {
        state.MonthlyAllEntities = action.payload.data;
      }
    );

    //another again
    builder.addCase(completeRegistration.pending, (state, action) => {
      state.step2loader = true;
    });

    builder.addCase(
      completeRegistration.fulfilled,
      (state: InitialState, action) => {
        state.step2loader = false;
        const { order_id, project_name, subject, registration_done } =
          action.payload;
        state.orderInfo = { ...state.orderInfo, registration_done: true };
        state.orders = state.orders.map((eachOrder) => {
          if (eachOrder.order_id === order_id) {
            return {
              ...eachOrder,
              project_name: project_name,
              subject,
              registration_done,
            };
          } else {
            return eachOrder;
          }
        });
      }
    );
    builder.addCase(completeRegistration.rejected, (state, action) => {
      state.step2loader = false;
    });

    builder.addCase(
      getGraphSubscribers.fulfilled,
      (state: any, action: any) => {
        state.subscribersGraph = action.payload.data;
      }
    );

    builder.addCase(getOnlineUsers.fulfilled, (state: any, action: any) => {
      state.onlineUsers = action.payload.data;
    });

    builder.addCase(
      getDailyOnlineUsersCount.fulfilled,
      (state: any, action: any) => {
        state.onlineUsersDaily = action.payload.data;
      }
    );

    builder.addCase(
      getMonthlyUsersOnlineCount.fulfilled,
      (state: any, action: any) => {
        state.onlineUsersMonthly = action.payload.data;
      }
    );

    builder.addCase(
      getTop10OrderedAccount.fulfilled,
      (state: any, action: any) => {
        state.top10OrderdAccounts = action.payload.data;
      }
    );

    builder.addCase(
      getCompleteOrderDetails.fulfilled,
      (state: any, action: any) => {
        state.orderInfo = action.payload.data;
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

export const { toggleSubscribeModal, toggleCallbackForm } = BDslice.actions;

export default BDslice.reducer;
