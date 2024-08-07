import { postJwtLogin } from "helpers/be_helpers";
import Cookies from "js-cookie";

import { apiError, resetLoginFlag, setLoading, stopLoading } from "./reducer";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import { setAuthorization } from "../../../helpers/api_helper";
import { saveProfile } from "../profile/reducer";

export const loginuser = (user: any, history: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    let response: any;

    response = await postJwtLogin({
      email: user.email,
      password: user.password,
    });

    if (response.status === 200) {
      const { jwt_token, userDetails } = response.data;
      Cookies.set(KDM_ECOMMERCE_USER_JWT_TOKEN, jwt_token);
      dispatch(saveProfile(userDetails));
      setAuthorization();
      history("/");
    } else {
      dispatch(apiError(response.message));
    }
    dispatch(stopLoading());
  } catch (error: any) {
    dispatch(apiError(error.data.message));
    dispatch(stopLoading());
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
