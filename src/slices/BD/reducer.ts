import { createSlice } from "@reduxjs/toolkit";
import { onRequestCallbackThunk } from "./thunk";

// import { RequestCallBackFormType } from "pages/BD/types";

interface InitialState {
  error: object;
  loading?: boolean;
}

export const initialState: InitialState = {
  error: {},
  loading: true,
};

const BDslice = createSlice({
  name: "BDslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   builder.addCase(
    //     onRequestCallbackThunk.fulfilled,
    //     (state: any, action: any) => {
    //       // state.products = action.payload;
    //       // state.loading = true;
    //       console.log("request callback thunk is done");
    //       console.log(action);
    //     }
    //   );
    // builder.addCase(
    //   onRequestCallbackThunk.rejected,
    //   (state: any, action: any) => {
    //     // state.error = action.payload ? action.payload?.error : null;
    //     console.log("request callback thunk is denied");
    //     console.log(action);
    //   }
    // );
  },
});

export default BDslice.reducer;
