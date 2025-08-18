import axios from "axios";
import { toast } from "react-toastify";

// khởi tạo đối tượng axios để custom
let authorizedAxiosInstance = axios.create();

// thời gian chờ tối đa 1 req: 10 phút
authorizedAxiosInstance.defaults.timeout = 100 * 10 * 10;

// cho phép axios tự động đính kèm và gửi cookie trong mỗi req
authorizedAxiosInstance.defaults.withCredential = true;

// add new req interceptors: can thiệp vào giữa req
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add new res interceptors: can thiệp vào giữa API
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // mọi stt code outside 200 -> 299 -> error
    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
