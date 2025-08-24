import type { AxiosInstance } from "axios";
import axios from "axios";


class Http {
  instance : AxiosInstance
  constructor(){
    this.instance = axios.create({
      baseURL : 'https://api-ecom.duthanhduoc.com/',
      timeout : 10000,
      headers : {
        'Content-Type' : 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http