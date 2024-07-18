import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import AccountReducer from "./auth/register/reducer";

//Ecommerse
import EcommerenceReducer from "./e-commerence/reducer";
import HRandAdminReducer from "./HRandAdmin/reducer";

import BDslice from "./BD/reducer";
import EmployeeSlice from "./Employee/reducer";
import CurrentUserSlice from "./CurrentUser/reducer";
import JobsReducer from "./jobs/reducer";
import LabReducer from "./Lab/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Profile: ProfileReducer,
  ForgetPassword: ForgotPasswordReducer,
  Account: AccountReducer,
  ecommerce: EcommerenceReducer,
  bd: BDslice,
  hrAndAdmin: HRandAdminReducer,
  EmployeeSlice: EmployeeSlice,
  CurrentUserSlice: CurrentUserSlice,
  jobs: JobsReducer,
  lab: LabReducer,
});

export default rootReducer;
