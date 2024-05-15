import { onEmployeeLogin as onLoginApi } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { employeeLoginSuccess } from "slices/CurrentUser/reducer";

export const employeeLogin =
  (data: any, history: any, setLoading: (loading: boolean) => void) =>
  async (dispatch: any) => {
    setLoading(true);
    try {
      const response = await onLoginApi(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
      dispatch(employeeLoginSuccess(response.data));
      setLoading(false);
      history("/profile");
    } catch (error: any) {
      toast.error(error.data.message, {
        autoClose: 10000,
      });
      setLoading(false);
      return error;
    }
  };
