import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import avatarNotFound from 'src/assets/user.svg'
import type { ErrorResponseApi } from 'src/types/utils.type'
export function isAxiosError<T>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err)
}

export function isAxiosUnprocessableEntityError<FormErr>(err: unknown): err is AxiosError<FormErr> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UNPROCESSABLE_ENTITY
}
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return error instanceof AxiosError && error.response?.status === HttpStatusCode.UNAUTHORIZED
}

export function isAxiosExpiredTokenError(error: unknown): error is AxiosError<ErrorResponseApi<{ name: string; message: string }>> {
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

// export const getAvatarURL = (avatarName?: string) =>
//   avatarName ? `${config.baseURL}images/${avatarName}` : (avatarNotFound as string)

export const getAvatarURL = (avatarName?: string): string =>
  avatarName ? `${config.baseURL}images/${avatarName}` : (avatarNotFound as string)
