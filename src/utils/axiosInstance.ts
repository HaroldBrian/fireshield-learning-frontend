import { appConfig } from "@/configurations/constants";
import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { checkTokenValidity } from "./tokenCheck";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.API_URL || "",
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    } else {
      (config.headers as AxiosRequestHeaders).Authorization =
        `Bearer ${appConfig.TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      checkTokenValidity();
    } else {
      console.error("Response Error: ", error);
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     switch (error.response?.status) {
//       case STATUS_CODES.UNAUTHORIZED:
//         // window.location.href = "/login";
//         // break;

//       case STATUS_CODES.BAD_REQUEST:
//         throw new Error("Your submitted data is invalid, verify that data is correct and try again.");

//       case STATUS_CODES.FORBIDDEN:
//         throw new Error("You do not have permission to access this resource. Contact the administrator.");

//       case STATUS_CODES.NOT_FOUND:
//         throw new Error("Resource not found");

//       case STATUS_CODES.METHOD_NOT_ALLOWED:
//         throw new Error("Invalid method. Contact the administrator");

//       case STATUS_CODES.REQUEST_TIMEOUT:
//         throw new Error("The request timed out, please try again later.");

//       case STATUS_CODES.UNSUPPORTED_MEDIA_TYPE:
//         throw new Error("Unsupported media type passed, please check the data submitted");

//       case STATUS_CODES.INTERNAL_SERVER_ERROR:
//         throw new Error("There was an error on the server-side, try again later. If the problem persists please contact the administrator");

//       case STATUS_CODES.SERVICE_UNAVAILABLE:
//         throw new Error("The service you requested is unavailable.");
//       default:
//         break;
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
