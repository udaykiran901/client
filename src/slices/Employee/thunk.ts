import { onEmployeeLogin as onLoginApi } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { employeeLoginSuccess } from "slices/CurrentUser/reducer";

export const employeeLogin =
  (data: any, history: any) => async (dispatch: any) => {
    try {
      const response = await onLoginApi(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
      dispatch(employeeLoginSuccess(response.data));
      history("/profile");
    } catch (error: any) {
      toast.error(error.data.message, {
        autoClose: 10000,
      });
      return error;
    }
  };
