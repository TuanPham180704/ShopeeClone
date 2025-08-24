import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "src/constants/httpStatusCode.enum";


class Http {
  instance : AxiosInstance
  constructor(){
    this.instance = axios.create({
      baseURL : 'https://api-ecom.duthanhduoc.com/',
      timeout : 10000,
      headers : {
        'Content-Type' : 'application/json'
      }
    }),
    this.instance.interceptors.response.use(function onFulfilled(response) {
    return response;
  }, function onRejected(error : AxiosError) {
    if(error.response?.status !== HttpStatusCode.UNPROCESSABLE_ENTITY){
      const data: any | undefined = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }
    return Promise.reject(error);
  });
  }
}

const http = new Http().instance

export default http