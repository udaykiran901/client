import { getFirebaseBackend } from "helpers/firebase_helper";
// import { postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import { postJwtLogin } from "helpers/fakebackend_helper";
import Cookies from "js-cookie";

import {
  loginSuccess,
  apiError,
  logoutUserSuccess,
  resetLoginFlag,
} from "./reducer";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import { setAuthorization } from "../../../helpers/api_helper";
import { saveProfile } from "../profile/reducer";

export const loginuser = (user: any, history: any) => async (dispatch: any) => {
  try {
    let response: any;
    response = await postJwtLogin({
      email: user.email,
      password: user.password,
    });

    if (response.status === 200) {
      const { jwt_token, userDetails } = response.data;
      Cookies.set(KDM_ECOMMERCE_USER_JWT_TOKEN, jwt_token);
      console.log(userDetails);
      dispatch(saveProfile(userDetails));
      setAuthorization();
      history("/");
    } else {
      console.log(response);
      dispatch(apiError(response.message));
    }
  } catch (error: any) {
    dispatch(apiError(error.data.message));
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");
    const fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginMsgFlag = () => {
  try {
    const response = resetLoginFlag();
    return response;
  } catch (error) {
    return error;
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response: any;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }

      const socialdata = await response;
      if (socialdata) {
        sessionStorage.setItem("authUser", JSON.stringify(socialdata));
        dispatch(loginSuccess(socialdata));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };
