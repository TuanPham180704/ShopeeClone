import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "src/constants/httpStatusCode.enum";
import type { AuthResponse } from "src/types/auth.type";
import { clearAccessTokenFromLS, getAccessTokenFromLS, savaAccessTokenToLS } from "src/utils/auth";


class Http {
  instance : AxiosInstance
  private accessToken : string 
  constructor(){
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL : 'https://api-ecom.duthanhduoc.com/',
      timeout : 10000,
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    this.instance.interceptors.request.use((config) =>{
      if(this.accessToken && config.headers) {
        config.headers.authorization = this.accessToken
        return config
      }
      return config
    },(error)=>{
      return Promise.reject(error)
    })
    this.instance.interceptors.response.use(
     (response) => {
      const {url} = response.config
      if(url === '/login' || url === '/register'){
        this.accessToken = (response.data as AuthResponse).data.access_token
        savaAccessTokenToLS(this.accessToken)
      }else if(url === '/logout'){
        this.accessToken = ''
        clearAccessTokenFromLS()
      }
    return response
  },
  function (error : AxiosError) {
    if(error.response?.status !== HttpStatusCode.UNPROCESSABLE_ENTITY){
      const data: any | undefined = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }
    return Promise.reject(error);
  })
  }
}

const http = new Http().instance

export default http




