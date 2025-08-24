import axios, { AxiosError } from "axios";
import HttpStatusCode from "src/constants/httpStatusCode.enum";
export function isAxiosError<T>(err : unknown): err is AxiosError<T>{
  return axios.isAxiosError(err)
}


export function isAxiosUnprocessableEntityError<FormErr>(err : unknown): err is AxiosError<FormErr>{
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UNPROCESSABLE_ENTITY
}
