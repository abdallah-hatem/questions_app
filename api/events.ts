import { ApiBaseUrl, request } from "./request"

export const GET_RANDOM_QUESTION = (params?: any) =>
  request<any>("get", `${ApiBaseUrl}/Question/random`, params)
