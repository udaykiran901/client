import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import AccountReducer from "./auth/register/reducer";

//Ecommerse
import EcommerenceReducer from "./e-commerence/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Profile: ProfileReducer,
  ForgetPassword: ForgotPasswordReducer,
  Account: AccountReducer,
  ecommerce: EcommerenceReducer,
});

export default rootReducer;
