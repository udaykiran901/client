import { createSlice } from "@reduxjs/toolkit";
import { onSubscribe } from "./thunk";

// import { RequestCallBackFormType } from "pages/BD/types";

interface InitialState {
  error: object;
  loading?: boolean;
  showSubscribeModal: boolean;
}

export const initialState: InitialState = {
  error: {},
  loading: true,
  showSubscribeModal: false,
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
  },
});

export const { toggleSubscribeModal } = BDslice.actions;

export default BDslice.reducer;
