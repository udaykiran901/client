import { postJwtRegister } from "../../../helpers/be_helpers";
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
    let response = await postJwtRegister("/ecommerce/user/register", user);
    dispatch(registerUserSuccessful(response.data));
    const { jwt_token } = response.data;
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
