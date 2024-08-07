import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
// import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
// import AccountReducer from "./auth/register/reducer";

//Ecommerse
import EcommerenceReducer from "./e-commerence/reducer";
import HRandAdminReducer from "./HRandAdmin/reducer";

import BDslice from "./BD/reducer";
import EmployeeSlice from "./Employee/reducer";
import CurrentUserSlice from "./CurrentUser/reducer";
// import JobsReducer from "./jobs/reducer";
import LabReducer from "./Lab/reducer";

import AccountReducer from "./auth/register/reducer";

import { LayoutState } from "./layouts/reducer";
import { LoginInitState } from "./auth/login/reducer";
import { ProfileInitState } from "./auth/profile/reducer";
import { EcommerceInitialState } from "./e-commerence/reducer";
import { BDInitialState } from "./BD/reducer";
import { HRInitialState } from "./HRandAdmin/reducer";
import { EmployeeInitialState } from "./Employee/reducer";
import { CurrentUser } from "./CurrentUser/reducer";
import { LabInitialState } from "./Lab/reducer";
import { RegisterSlice } from "./auth/register/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Profile: ProfileReducer,
  ecommerce: EcommerenceReducer,
  bd: BDslice,
  hrAndAdmin: HRandAdminReducer,
  EmployeeSlice: EmployeeSlice,
  CurrentUserSlice: CurrentUserSlice,
  lab: LabReducer,
  Account: AccountReducer,
});

export default rootReducer;

export interface RootState {
  Layout: LayoutState;
  Login: LoginInitState;
  Profile: ProfileInitState;
  ecommerce: EcommerceInitialState;
  bd: BDInitialState;
  hrAndAdmin: HRInitialState;
  EmployeeSlice: EmployeeInitialState;
  CurrentUserSlice: CurrentUser;
  lab: LabInitialState;
  Account: RegisterSlice;
}
