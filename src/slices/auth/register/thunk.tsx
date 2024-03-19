import { postJwtRegister } from "../../../helpers/fakebackend_helper";
import Cookies from "js-cookie";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} from "./reducer";

import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import { setAuthorization } from "../../../helpers/api_helper";

// Is user register successfull then direct plot user in redux.
export const registerUser = (user: any) => async (dispatch: any) => {
  try {
    let response = postJwtRegister("/ecommerce/user/register", user);
    const data: any = await response;
    dispatch(registerUserSuccessful(data));
    const { jwt_token } = data;
    Cookies.set(KDM_ECOMMERCE_USER_JWT_TOKEN, jwt_token);
    setAuthorization();
  } catch (error) {
    dispatch(registerUserFailed(true));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange("");
    return response;
  } catch (error) {
    return error;
  }
};
