import axios from "axios";
import Cookies from "js-cookie";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";

// export const url = "http://localhost:8081/api";
export const url = process.env.REACT_APP_SERVER_API;

axios.defaults.baseURL = url;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: any) {
    const formattedResponse = { data: response.data, status: response.status };
    return response.data ? formattedResponse : response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // let message: any;

    const errorObj = {
      ...error.response,
    };

    // switch (error.status) {
    //   case 500:
    //     message = "Internal Server Error";
    //     break;
    //   case 401:
    //     message = "Invalid credentials";
    //     break;
    //   case 404:
    //     message = "Sorry! the data you are looking for could not be found";
    //     break;
    //   default:
    //     message = error.message || error;
    // }
    // console.log(error.status);
    // console.log("message", message);
    return Promise.reject(errorObj);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = () => {
  const ecommerce_user_token = Cookies.get(KDM_ECOMMERCE_USER_JWT_TOKEN);
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + ecommerce_user_token;
};

const containsFiles = (data: any) => {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (data[key] instanceof File) {
        return true;
      }
    }
  }
  return false;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params: any) => {
    let response: any;
    setAuthorization();

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: any, data: any) => {
    setAuthorization();
    const filesIncluded = containsFiles(data);

    const contentType = filesIncluded
      ? "multipart/form-data"
      : "application/json";
    axios.defaults.headers.post["Content-Type"] = contentType;

    const res = axios.post(url, data);
    return res;
  };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    const filesIncluded = containsFiles(data);
    const contentType = filesIncluded
      ? "multipart/form-data"
      : "application/json";
    axios.defaults.headers.post["Content-Type"] = contentType;
    return axios.patch(url, data);
  };

  put = (url: any, data: any) => {
    const filesIncluded = containsFiles(data);
    const contentType = filesIncluded
      ? "multipart/form-data"
      : "application/json";
    axios.defaults.headers.post["Content-Type"] = contentType;
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config: any) => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const isUserLoggedin = (token: string) => {
  const jwt_token = Cookies.get(token);
  if (jwt_token) return true;
  return false;
};

export { APIClient, setAuthorization, getLoggedinUser, isUserLoggedin };
